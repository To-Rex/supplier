import React, { lazy, Suspense, memo } from 'react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import LazySection from '../components/LazySection';
import SEOOptimizer from '../components/SEOOptimizer';
import { useTheme } from '../contexts/ThemeContext';
import { usePerformanceOptimization } from '../hooks/usePerformance';
import { useAnimationOptimization } from '../hooks/useAnimationOptimization';

const Blog = lazy(() => import('../components/Blog'));
const Footer = lazy(() => import('../components/Footer'));

const SectionSkeleton = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center" role="status" aria-label="Yuklanmoqda">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
    <span className="sr-only">Kontent yuklanmoqda...</span>
  </div>
));

const BlogPage: React.FC = () => {
  const { isDark } = useTheme();

  usePerformanceOptimization();
  useAnimationOptimization();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <SEOOptimizer
        title="Blog - Torex"
        description="Torex blog: IT yangiliklari, dasturlash bo'yicha maslahatlar, texnologiya trendlari va innovatsion yechimlar."
        keywords="blog, it yangiliklari, dasturlash, texnologiya, torex it"
        canonicalUrl="https://torexdev.uz/blog"
      />
      <Header />
      <main>
        <LazySection fallback={<SectionSkeleton />}>
          <Blog />
        </LazySection>
      </main>
      <LazySection fallback={<SectionSkeleton />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default memo(BlogPage);