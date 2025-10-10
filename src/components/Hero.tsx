import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Hero: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  const heroClass = `relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`;
  
  return (
    <section id="hero" className={heroClass}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-teal-500' : 'bg-teal-300'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Professional IT Solutions
            </span>
          </div>

          <h1 className={`${typography.h1} ${textColors.primary} max-w-4xl mx-auto`}>
            Raqamli Kelajakni{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Birga Quramiz
            </span>
          </h1>

          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-2xl mx-auto`}>
            Veb dasturlash, mobil ilovalar va AI yechimlar orqali biznesingizni 
            yangi bosqichga olib chiqamiz
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="font-semibold">Bepul Konsultatsiya</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#portfolio"
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl transition-all duration-300 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-50'} border-2 ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:border-blue-600`}
            >
              <span className="font-semibold">Portfolio ko'rish</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
