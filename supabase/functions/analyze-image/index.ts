import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, focusKeyword } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an SEO image analysis expert. Analyze the uploaded image and generate SEO-optimized metadata.

TASK:
1. Analyze the actual image content (visuals + any visible text)
2. Perform OCR to read any visible text (numbers, years, names, schemes, brands)
3. Detect the image type (poster, banner, government scheme, screenshot, product image, logo, infographic, photo, etc.)
4. Generate SEO-optimized metadata

RULES:
- IGNORE any original filename - focus only on image content
- Include important detected text like scheme names, years, amounts, dates
- Use lowercase only, hyphen-separated for filename
- Make filename descriptive and keyword-rich
- ALT text should be descriptive and accessible
- TITLE text should be concise and engaging

${focusKeyword ? `FOCUS KEYWORD: "${focusKeyword}" - Incorporate this naturally into the metadata.` : 'No focus keyword provided - derive the main topic from image content.'}

RESPOND IN EXACTLY THIS JSON FORMAT (no markdown, no explanation):
{
  "detectedType": "banner|logo|screenshot|product|photo|infographic|poster|document|icon|illustration",
  "detectedContent": "Brief description of what you see in the image",
  "detectedText": "Any text visible in the image (OCR)",
  "filename": "seo-optimized-filename.webp",
  "altText": "Descriptive alt text for accessibility",
  "titleText": "Engaging title text"
}`;

    const userPrompt = focusKeyword 
      ? `Analyze this image with focus keyword: "${focusKeyword}"` 
      : `Analyze this image and generate SEO metadata`;

    console.log('Calling Lovable AI for image analysis...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    console.log('AI response:', content);

    // Parse the JSON response
    let analysisResult;
    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a fallback response
      analysisResult = {
        detectedType: 'image',
        detectedContent: 'Unable to analyze image content',
        detectedText: '',
        filename: focusKeyword 
          ? `${focusKeyword.toLowerCase().replace(/\s+/g, '-')}-image.webp` 
          : 'optimized-image.webp',
        altText: focusKeyword || 'Optimized image',
        titleText: focusKeyword || 'Image',
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-image function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
