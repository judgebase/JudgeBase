import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  structuredData?: object;
  canonical?: string;
}

export function SEO({
  title,
  description,
  keywords = "hackathon judges, expert judges, hackathon judging, judge network, hackathon platform",
  ogTitle,
  ogDescription,
  ogImage = "/api/placeholder/1200/630",
  ogUrl = window.location.href,
  structuredData,
  canonical
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | JudgeBase`;
    
    // Update meta description
    updateMetaTag('description', description);
    
    // Update keywords
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', ogTitle || title, 'property');
    updateMetaTag('og:description', ogDescription || description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', ogUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'JudgeBase', 'property');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', ogTitle || title, 'name');
    updateMetaTag('twitter:description', ogDescription || description, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    
    // Update canonical URL
    if (canonical) {
      updateCanonicalTag(canonical);
    }
    
    // Add structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, structuredData, canonical]);

  return null;
}

function updateMetaTag(property: string, content: string, attribute: string = 'name') {
  let element = document.querySelector(`meta[${attribute}="${property}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    element.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(element);
  }
}

function updateCanonicalTag(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  
  if (element) {
    element.setAttribute('href', url);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(element);
  }
}

function updateStructuredData(data: object) {
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.getElementsByTagName('head')[0].appendChild(script);
}