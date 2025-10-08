import React, { useEffect, useState, lazy, Suspense, useCallback, memo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import LazySection from './components/LazySection';
import SEOOptimizer from './components/SEOOptimizer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { usePerformanceOptimization } from './hooks/usePerformance';
import { useAnimationOptimization } from './hooks/useAnimationOptimization';

// Lazy load non-critical components with prefetch hints
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const Footer = lazy(() => import('./components/Footer'));

// Memoized loading fallback component
const SectionSkeleton = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center" role="status" aria-label="Yuklanmoqda">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
    <span className="sr-only">Kontent yuklanmoqda...</span>
  </div>
));

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  // Apply performance optimizations
  usePerformanceOptimization();
  useAnimationOptimization();

  // Optimized loading state management
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Use requestIdleCallback for non-critical operations
    const handleLoad = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(handleLoadingComplete, { timeout: 1000 });
      } else {
        setTimeout(handleLoadingComplete, 800);
      }
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [handleLoadingComplete]);

  // Prefetch critical components after initial load
  useEffect(() => {
    if (!isLoading && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch components that are likely to be needed
        import('./components/About');
        import('./components/Services');
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <SEOOptimizer
        title="Supplier IT - Professional Veb Dasturlash, Mobil Ilovalar va Telegram Botlar"
        description="Supplier IT - O'zbekistondagi yetakchi IT kompaniya. Professional veb-sayt dasturlash, iOS va Android uchun mobil ilovalar, maxsus Telegram botlar."
        keywords="veb dasturlash, mobil ilovalar, telegram botlar, iOS, Android, IT xizmatlar, O'zbekiston, Toshkent"
        canonicalUrl="https://supplier.uz/"
      />
      <Header />
      <main>
        <Hero />
        <LazySection fallback={<SectionSkeleton />}>
          <About />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Services />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Portfolio />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Blog />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Contact />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Footer />
        </LazySection>
      </main>
    </div>
  );
};

// Memoize the main app component to prevent unnecessary re-renders
const MemoizedAppContent = memo(AppContent);

function App() {
  return (
    <ThemeProvider>
      <MemoizedAppContent />
    </ThemeProvider>
  );
}

export default App;
