import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Maximum image size: 5MB (in bytes)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// Allowed image formats
const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

// Validate and sanitize input
function validateImageBase64(imageBase64: unknown): { valid: boolean; error?: string; sanitized?: string } {
  if (!imageBase64 || typeof imageBase64 !== 'string') {
    return { valid: false, error: 'Image data is required' };
  }

  // Check for data URL format
  const dataUrlMatch = imageBase64.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i);
  if (!dataUrlMatch) {
    return { valid: false, error: 'Invalid image format. Supported formats: JPEG, PNG, GIF, WebP' };
  }

  // Extract base64 data and check size
  const base64Data = imageBase64.split(',')[1];
  if (!base64Data) {
    return { valid: false, error: 'Invalid image data' };
  }

  // Estimate size: base64 encoded data is ~4/3 the size of the original
  const estimatedSize = (base64Data.length * 3) / 4;
  if (estimatedSize > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image too large. Maximum size is 5MB' };
  }

  return { valid: true, sanitized: imageBase64 };
}

// Sanitize focus keyword to prevent prompt injection
function sanitizeFocusKeyword(focusKeyword: unknown): string | undefined {
  if (!focusKeyword || typeof focusKeyword !== 'string') {
    return undefined;
  }

  // Trim, limit length, and remove potentially harmful characters
  return focusKeyword
    .trim()
    .substring(0, 100)
    .replace(/[<>"'`\\]/g, '')
    .replace(/[\n\r\t]/g, ' ')
    .replace(/\s+/g, ' ');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { imageBase64, focusKeyword } = requestBody;

    // Validate image data
    const imageValidation = validateImageBase64(imageBase64);
    if (!imageValidation.valid) {
      return new Response(
        JSON.stringify({ error: imageValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize focus keyword
    const sanitizedKeyword = sanitizeFocusKeyword(focusKeyword);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service is not available' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

${sanitizedKeyword ? `FOCUS KEYWORD: "${sanitizedKeyword}" - Incorporate this naturally into the metadata.` : 'No focus keyword provided - derive the main topic from image content.'}

RESPOND IN EXACTLY THIS JSON FORMAT (no markdown, no explanation):
{
  "detectedType": "banner|logo|screenshot|product|photo|infographic|poster|document|icon|illustration",
  "detectedContent": "Brief description of what you see in the image",
  "detectedText": "Any text visible in the image (OCR)",
  "filename": "seo-optimized-filename.webp",
  "altText": "Descriptive alt text for accessibility",
  "titleText": "Engaging title text"
}`;

    const userPrompt = sanitizedKeyword 
      ? `Analyze this image with focus keyword: "${sanitizedKeyword}"` 
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
                  url: imageValidation.sanitized!.startsWith('data:') 
                    ? imageValidation.sanitized! 
                    : `data:image/jpeg;base64,${imageValidation.sanitized}`
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
          JSON.stringify({ error: 'Service is busy. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service temporarily unavailable.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Image analysis failed. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Image analysis failed. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('AI response received successfully');

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
        filename: sanitizedKeyword 
          ? `${sanitizedKeyword.toLowerCase().replace(/\s+/g, '-')}-image.webp` 
          : 'optimized-image.webp',
        altText: sanitizedKeyword || 'Optimized image',
        titleText: sanitizedKeyword || 'Image',
      };
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-image function:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
