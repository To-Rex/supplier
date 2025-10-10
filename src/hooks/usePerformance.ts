import { useEffect } from 'react';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        '/hero-bg.webp',
        '/logo.webp'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize scroll performance
    const optimizeScrolling = () => {
      let ticking = false;
      
      const updateScrollPosition = () => {
        // Use passive event listeners for better performance
        ticking = false;
      };
      
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', onScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    };

    // Set up Intersection Observer for lazy loading
    const setupIntersectionObserver = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '50px'
          }
        );

        // Observe all sections
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
      }
    };

    preloadCriticalResources();
    const cleanupScroll = optimizeScrolling();
    const cleanupObserver = setupIntersectionObserver();

    return () => {
      cleanupScroll?.();
      cleanupObserver?.();
    };
  }, []);
};

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor performance entries using native Performance API
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry);
          }
          if (entry.entryType === 'paint') {
            console.log('Paint timing:', entry);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'paint'] });

      return () => observer.disconnect();
    }

    // Basic performance metrics without external dependency
    if ('performance' in window && performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log('Page load time:', loadTime + 'ms');
    }
  }, []);
};
