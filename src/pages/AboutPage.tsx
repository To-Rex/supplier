import React, { lazy, Suspense, memo } from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import LazySection from '../components/LazySection';
import SEOOptimizer from '../components/SEOOptimizer';
import { useTheme } from '../contexts/ThemeContext';
import { usePerformanceOptimization } from '../hooks/usePerformance';
import { useAnimationOptimization } from '../hooks/useAnimationOptimization';

const About = lazy(() => import('../components/About'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const SectionSkeleton = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center" role="status" aria-label="Yuklanmoqda">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
    <span className="sr-only">Kontent yuklanmoqda...</span>
  </div>
));

const AboutPage: React.FC = () => {
  const { isDark } = useTheme();

  usePerformanceOptimization();
  useAnimationOptimization();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <SEOOptimizer
        title="Biz haqimizda - Torex"
        description="Torex haqida batafsil ma'lumot. O'zbekistondagi yetakchi IT kompaniya. 5+ yillik tajriba, professional jamoa, innovatsion yechimlar."
        keywords="biz haqimizda, torex it, it kompaniya, o'zbekiston it, professional jamoa"
        canonicalUrl="https://torexdev.uz/about"
      />
      <Header />
      <main>
        <LazySection fallback={<SectionSkeleton />}>
          <About />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Contact />
        </LazySection>
      </main>
      <LazySection fallback={<SectionSkeleton />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default memo(AboutPage);