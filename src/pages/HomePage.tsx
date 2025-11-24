import React, { lazy, Suspense, memo } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import LoadingScreen from '../components/LoadingScreen';
import LazySection from '../components/LazySection';
import SEOOptimizer from '../components/SEOOptimizer';
import WhyChooseUs from '../components/WhyChooseUs';
import OurProcess from '../components/OurProcess';
import Statistics from '../components/Statistics';
import CallToAction from '../components/CallToAction';
import { useTheme } from '../contexts/ThemeContext';
import { usePerformanceOptimization } from '../hooks/usePerformance';
import { useAnimationOptimization } from '../hooks/useAnimationOptimization';

const Footer = lazy(() => import('../components/Footer'));

const SectionSkeleton = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center" role="status" aria-label="Yuklanmoqda">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
    <span className="sr-only">Kontent yuklanmoqda...</span>
  </div>
));

const HomePage: React.FC = () => {
  const { isDark } = useTheme();

  usePerformanceOptimization();
  useAnimationOptimization();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <SEOOptimizer
        title="Torex - Professional Veb Dasturlash, Mobil Ilovalar, CRM va AI Yechimlar"
        description="Torex - O'zbekistondagi yetakchi IT kompaniya. Professional veb-sayt va mobil ilova dasturlash, iOS va Android ilovalar, Telegram botlar, CRM tizimlar va AI yechimlar. 5+ yillik tajriba, 100+ mamnun mijozlar. Bepul konsultatsiya!"
        keywords="veb dasturlash, mobil ilovalar, telegram botlar, iOS dasturlash, Android dasturlash, CRM tizimlar, AI yechimlar, raqamli marketing, elektron tijorat, IT xizmatlar, dasturiy ta'minot, O'zbekiston, Toshkent, torex it, torex uz"
        canonicalUrl="https://torexdev.uz/"
      />
      <Header />
      <main>
        <Hero />
        <LazySection fallback={<SectionSkeleton />}>
          <WhyChooseUs />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <OurProcess />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <Statistics />
        </LazySection>
        <LazySection fallback={<SectionSkeleton />}>
          <CallToAction />
        </LazySection>
      </main>
      <LazySection fallback={<SectionSkeleton />}>
        <Footer />
      </LazySection>
    </div>
  );
};

export default memo(HomePage);