import React, { useEffect } from 'react';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
  articleSection?: string;
  locale?: string;
}

const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  author = 'Torex IT',
  publishDate,
  modifiedDate,
  articleSection,
  locale = 'uz_UZ'
}) => {
  useEffect(() => {
    // Update title with proper format
    if (title) {
      const fullTitle = title.includes('Torex IT') ? title : `${title} | Torex IT`;
      document.title = fullTitle;
      
      // Update OG title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', fullTitle);
      }
      
      // Update Twitter title
      const twitterTitle = document.querySelector('meta[name="twitter:title"], meta[property="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', fullTitle);
      }
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
      
      // Update OG description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
      
      // Update Twitter description
      const twitterDescription = document.querySelector('meta[name="twitter:description"], meta[property="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update author
    if (author) {
      let authorMeta = document.querySelector('meta[name="author"]');
      if (!authorMeta) {
        authorMeta = document.createElement('meta');
        authorMeta.setAttribute('name', 'author');
        document.head.appendChild(authorMeta);
      }
      authorMeta.setAttribute('content', author);
    }

    // Update OG image
    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      }
      
      const twitterImage = document.querySelector('meta[name="twitter:image"], meta[property="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', ogImage);
      }
    }

    // Update canonical URL
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
      
      // Update OG URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonicalUrl);
      }
      
      // Update Twitter URL
      const twitterUrl = document.querySelector('meta[name="twitter:url"], meta[property="twitter:url"]');
      if (twitterUrl) {
        twitterUrl.setAttribute('content', canonicalUrl);
      }
    }

    // Update locale
    if (locale) {
      const ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale) {
        ogLocale.setAttribute('content', locale);
      }
      
      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', locale.split('_')[0]);
    }

    // Add publish date
    if (publishDate) {
      let publishMeta = document.querySelector('meta[property="article:published_time"]');
      if (!publishMeta) {
        publishMeta = document.createElement('meta');
        publishMeta.setAttribute('property', 'article:published_time');
        document.head.appendChild(publishMeta);
      }
      publishMeta.setAttribute('content', publishDate);
    }

    // Add modified date
    if (modifiedDate) {
      let modifiedMeta = document.querySelector('meta[property="article:modified_time"]');
      if (!modifiedMeta) {
        modifiedMeta = document.createElement('meta');
        modifiedMeta.setAttribute('property', 'article:modified_time');
        document.head.appendChild(modifiedMeta);
      }
      modifiedMeta.setAttribute('content', modifiedDate);
    }

    // Add article section
    if (articleSection) {
      let sectionMeta = document.querySelector('meta[property="article:section"]');
      if (!sectionMeta) {
        sectionMeta = document.createElement('meta');
        sectionMeta.setAttribute('property', 'article:section');
        document.head.appendChild(sectionMeta);
      }
      sectionMeta.setAttribute('content', articleSection);
    }

    // Enhanced JSON-LD structured data
    const currentUrl = canonicalUrl || window.location.href;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${currentUrl}#webpage`,
      "url": currentUrl,
      "name": title || "Torex IT - Professional IT Xizmatlar",
      "description": description || "Professional veb dasturlash, mobil ilovalar, Telegram botlar va AI yechimlar",
      "inLanguage": locale.split('_')[0],
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://torexdev.uz/#website"
      },
      "about": {
        "@type": "Organization",
        "@id": "https://torexdev.uz/#organization"
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://torexdev.uz/#organization"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Bosh sahifa",
          "item": "https://torexdev.uz/"
        }]
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://torexdev.uz/#organization"
      },
      "datePublished": publishDate || new Date().toISOString(),
      "dateModified": modifiedDate || new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "@id": "https://torexdev.uz/#organization"
      },
      "potentialAction": [{
        "@type": "ReadAction",
        "target": [currentUrl]
      }]
    };

    // Remove existing page-specific JSON-LD
    const existingJsonLd = document.querySelector('script[data-page-jsonld]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    // Add new JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-jsonld', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Add preload hints for critical resources
    const addPreloadHint = (href: string, as: string, type?: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
      }
    };

    // Preload critical images if ogImage is provided
    if (ogImage) {
      addPreloadHint(ogImage, 'image');
    }

    return () => {
      // Cleanup on component unmount
      const pageJsonLd = document.querySelector('script[data-page-jsonld]');
      if (pageJsonLd) {
        pageJsonLd.remove();
      }
    };
  }, [title, description, keywords, ogImage, canonicalUrl, author, publishDate, modifiedDate, articleSection, locale]);

  return null; // This component doesn't render anything
};

export default SEOOptimizer;

// Hook for dynamic SEO updates and performance monitoring
export const useSEO = (options: SEOOptimizerProps) => {
  useEffect(() => {
    // Page visibility tracking for engagement metrics
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Track page view time for SEO metrics
        const startTime = Date.now();
        
        const handleBeforeUnload = () => {
          const timeSpent = Date.now() - startTime;
          if (timeSpent > 5000) { // Only count if user spent more than 5 seconds
            console.log('Good engagement time:', timeSpent + 'ms');
          }
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload, { once: true });
      }
    };

    // Track page load performance
    const trackPerformance = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
              if (loadTime > 0) {
                console.log('Page load time:', loadTime + 'ms');
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['navigation'] });
        
        return () => observer.disconnect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    const cleanupPerformance = trackPerformance();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cleanupPerformance?.();
    };
  }, []);

  return null;
};

// Component for adding FAQ structured data
export const FAQStructuredData: React.FC<{ faqs: Array<{ question: string; answer: string }> }> = ({ faqs }) => {
  useEffect(() => {
    if (faqs.length === 0) return;

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "@id": `#faq-${index}`,
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const existingFAQ = document.querySelector('script[data-faq-jsonld]');
    if (existingFAQ) {
      existingFAQ.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-jsonld', 'true');
    script.textContent = JSON.stringify(faqJsonLd);
    document.head.appendChild(script);

    return () => {
      const faqScript = document.querySelector('script[data-faq-jsonld]');
      if (faqScript) {
        faqScript.remove();
      }
    };
  }, [faqs]);

  return null;
};
