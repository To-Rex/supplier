import React, { lazy, Suspense, memo } from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import LazySection from '../components/LazySection';
import SEOOptimizer from '../components/SEOOptimizer';
import { useTheme } from '../contexts/ThemeContext';
import { usePerformanceOptimization } from '../hooks/usePerformance';
import { useAnimationOptimization } from '../hooks/useAnimationOptimization';

const Portfolio = lazy(() => import('../components/Portfolio'));
const Footer = lazy(() => import('../components/Footer'));

const SectionSkeleton = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center" role="status" aria-label="Yuklanmoqda">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
    <span className="sr-only">Kontent yuklanmoqda...</span>
  </div>
));

const PortfolioPage: React.FC = () => {
  const { isDark } = useTheme();

  usePerformanceOptimization();
  useAnimationOptimization();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <SEOOptimizer
        title="Portfolio - Torex"
        description="Torex portfolio: Muvaffaqiyatli loyihalar, veb-saytlar, mobil ilovalar, CRM tizimlar va boshqa IT yechimlar."
        keywords="portfolio, loyihalar, veb-saytlar, mobil ilovalar, crm, torex it"
        canonicalUrl="https://torexdev.uz/portfolio"
      />
      <Header />
      <main>
        <LazySection fallback={<SectionSkeleton />}>
          <Portfolio />
        </LazySection>
      </main>
      <LazySection fallback={<SectionSkeleton />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default memo(PortfolioPage);