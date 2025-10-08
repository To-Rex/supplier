import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Code, Smartphone, Bot } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { generateOptimizedParticles, generateOptimizedShapes } from '../utils/performanceAnimations';

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const texts = ['Professional Veb-saytlar', 'Mobil Ilovalar', 'Telegram Botlar', 'Raqamli Yechimlar'];
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  // Memoize particles for better performance
  const optimizedParticles = useMemo(() => generateOptimizedParticles(12), []);
  const optimizedShapes = useMemo(() => generateOptimizedShapes(6), []);

  // Respect reduced motion preferences
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (isAnimationPaused || prefersReducedMotion) return;

    const typeWriter = () => {
      const currentFullText = texts[currentIndex];
      
      if (currentText.length < currentFullText.length) {
        setCurrentText(currentFullText.slice(0, currentText.length + 1));
      } else {
        setTimeout(() => {
          setCurrentText('');
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    };

    const timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, texts, isAnimationPaused, prefersReducedMotion]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceName: string) => {
    scrollToSection('services');
    // Announce service selection to screen readers
    const announcement = `${serviceName} xizmati tanlandi. Xizmatlar qismiga o'tilmoqda.`;
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    document.body.appendChild(liveRegion);
    setTimeout(() => document.body.removeChild(liveRegion), 1000);
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
      role="banner"
      aria-label="Bosh sahifa qismi"
    >
      {/* Animated Background Particles - Hidden from screen readers */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-blue-700/50 to-blue-800/50"></div>
        {!prefersReducedMotion && (
          <>
            <div className="absolute w-full h-full">
              {optimizedParticles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={particle}
                />
              ))}
            </div>
            
            {/* Floating geometric shapes */}
            <div className="absolute inset-0">
              {optimizedShapes.map((shape) => (
                <div
                  key={shape.id}
                  className="absolute opacity-10"
                  style={shape}
                >
                  <div className="w-4 h-4 bg-white rotate-45 animate-spin" style={{
                    animationDuration: '8s',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-8 max-w-5xl mx-auto w-full py-20">
        <div className="mb-4 md:mb-6 animate-fade-in-up">
          <Bot
            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-4 md:mb-6 text-white ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
            style={{ animationDuration: '2s' }}
            aria-hidden="true"
          />
        </div>

        <h1
          className={`${typography.heroMain} text-white mb-4 md:mb-6 animate-fade-in-up animation-delay-200`}
          id="main-content"
          tabIndex={-1}
          aria-label="Supplier IT kompaniyasining bosh sahifasi"
        >
          <span className={`inline-block ${!prefersReducedMotion ? 'animate-pulse' : ''}`}>Biz</span>{' '}
          <span className={`inline-block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent ${!prefersReducedMotion ? 'animate-pulse animation-delay-400' : ''}`}>
            Yaratamiz
          </span>
        </h1>

        <div className="h-14 sm:h-16 md:h-20 flex items-center justify-center mb-6 md:mb-8">
          <div
            aria-live="polite"
            aria-label={`Hozir ko'rsatilayotgan xizmat: ${currentText || texts[currentIndex]}`}
            className={`${typography.heroAnimated} text-blue-200 animate-fade-in-up animation-delay-600`}
          >
            {/* Control animation playback */}
            <button
              onClick={() => setIsAnimationPaused(!isAnimationPaused)}
              className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-white/20 text-white px-2 py-1 rounded text-sm"
              aria-label={isAnimationPaused ? "Animatsiyani davom ettirish" : "Animatsiyani to'xtatish"}
            >
              {isAnimationPaused ? "Davom ettirish" : "To'xtatish"}
            </button>
            
            <span role="text">
              {currentText || texts[currentIndex]}
              {!prefersReducedMotion && <span className="animate-pulse text-white" aria-hidden="true">|</span>}
            </span>
          </div>
        </div>

        <p className={`${typography.heroSubtitle} text-blue-100 mb-6 md:mb-8 max-w-2xl md:max-w-3xl mx-auto animate-fade-in-up animation-delay-800 leading-relaxed px-2`}>
          G'oyalarni zamonaviy texnologiyalar va innovatsion yechimlar bilan raqamli haqiqatga aylantiramiz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in-up animation-delay-1000 mb-8 md:mb-10">
          <button
            onClick={() => scrollToSection('about')}
            className={`w-full sm:w-auto group bg-white text-blue-600 px-8 md:px-10 py-3.5 md:py-4 rounded-full ${typography.button} hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-white/20 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600`}
            aria-label="Biz haqimizda qismiga o'tish"
          >
            <span className="relative z-10">Boshlash</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`w-full sm:w-auto group border-2 border-white text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full ${typography.button} hover:bg-white hover:text-blue-600 transition-all duration-500 transform hover:scale-105 shadow-2xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600`}
            aria-label="Portfolio qismiga o'tish"
          >
            <span className="relative z-10">Portfolio ko'rish</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto animate-fade-in-up animation-delay-1200"
          role="list"
          aria-label="Asosiy xizmatlar ro'yxati"
        >
          {[
            { icon: Code, label: 'Veb Dasturlash', delay: '0s', description: 'Professional veb-saytlar va veb-ilovalar yaratish' },
            { icon: Smartphone, label: 'Mobil Ilovalar', delay: '0.2s', description: 'iOS va Android uchun mobil ilovalar dasturlash' },
            { icon: Bot, label: 'Telegram Botlar', delay: '0.4s', description: 'Biznes uchun maxsus Telegram botlar yaratish' }
          ].map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-white/90 cursor-pointer transform hover:scale-105 md:hover:scale-110 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-lg p-4 md:p-6"
              style={{ animationDelay: item.delay }}
              role="listitem"
              tabIndex={0}
              aria-label={`${item.label} xizmati. ${item.description}`}
              onClick={() => handleServiceClick(item.label)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleServiceClick(item.label);
                }
              }}
            >
              <div className="relative mb-3 md:mb-4">
                <item.icon
                  className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-125 transition-transform duration-500"
                  aria-hidden="true"
                />
                {!prefersReducedMotion && (
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                )}
              </div>
              <span className={`${typography.bodySmall} font-medium group-hover:text-white transition-colors duration-300 text-center`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer hover:scale-125 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-full p-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
        style={{ animationDuration: '2s' }}
        aria-label="Keyingi qismga o'tish - Biz haqimizda"
      >
        <ChevronDown className="w-10 h-10" aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;
