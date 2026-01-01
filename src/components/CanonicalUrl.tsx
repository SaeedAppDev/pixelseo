import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.pixelseo.net';

export const CanonicalUrl = () => {
  const location = useLocation();
  
  // Build canonical URL with www prefix and current path
  const canonicalUrl = `${BASE_URL}${location.pathname === '/' ? '' : location.pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};
