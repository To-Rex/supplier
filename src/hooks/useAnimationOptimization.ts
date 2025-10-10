import { useEffect } from 'react';

export const useAnimationOptimization = () => {
  useEffect(() => {
    // Enable CSS containment for better performance
    const optimizeElements = () => {
      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.contain = 'layout style paint';
        htmlElement.style.willChange = htmlElement.style.willChange || 'transform';
      });
    };

    // Reduce motion for users who prefer it
    const respectMotionPreferences = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--animation-iteration-count', '1');
      }
    };

    // Monitor performance and adapt animations
    const monitorPerformance = () => {
      if ('performance' in window && 'observer' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const longTasks = entries.filter(entry => entry.duration > 50);
            
            if (longTasks.length > 0) {
              // Reduce animation complexity if performance is poor
              document.documentElement.classList.add('reduce-animations');
            }
          });
          
          observer.observe({ entryTypes: ['longtask'] });
          
          return () => observer.disconnect();
        } catch (e) {
          console.warn('Performance monitoring not supported');
        }
      }
    };

    // Use Intersection Observer to pause animations when not visible
    const optimizeOffscreenAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              element.style.animationPlayState = 'running';
            } else {
              element.style.animationPlayState = 'paused';
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0
        }
      );

      const animatedElements = document.querySelectorAll('[class*="animate-"]');
      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    optimizeElements();
    respectMotionPreferences();
    const cleanupPerformance = monitorPerformance();
    const cleanupIntersection = optimizeOffscreenAnimations();

    return () => {
      cleanupPerformance?.();
      cleanupIntersection?.();
    };
  }, []);
};
