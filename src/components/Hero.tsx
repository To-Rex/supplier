import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Code, Smartphone, Bot } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { generateOptimizedParticles, generateOptimizedShapes } from '../utils/performanceAnimations';

interface ShootingStar {
  id: number;
  left: string;
  top: string;
  delay: number;
  angle: number;
}

interface RainDrop {
  id: number;
  left: string;
  delay: number;
}

interface ExtraCloud {
  id: number;
  left: string;
  top: string;
  size: number;
}

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [extraClouds, setExtraClouds] = useState<ExtraCloud[]>([]);
  const [cloudDarkness, setCloudDarkness] = useState(0);
  const [cloudScale, setCloudScale] = useState(1);
  const texts = ['Professional Veb-saytlar', 'Mobil Ilovalar', 'Telegram Botlar', 'Raqamli Yechimlar'];
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  // Memoize particles and stars for better performance - use fixed seed
  const optimizedParticles = useMemo(() => generateOptimizedParticles(12), []);
  const optimizedShapes = useMemo(() => generateOptimizedShapes(6), []);

  // Generate fixed star positions once with truly random distribution
  const staticStars = useMemo(() => {
    const generateRandomStars = () => {
      const stars = [];
      for (let i = 0; i < 40; i++) {
        stars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.3,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 2
        });
      }
      return stars;
    };
    return generateRandomStars();
  }, []);

  // Respect reduced motion preferences
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Shooting stars effect - only in dark mode and on scroll
  useEffect(() => {
    if (!isDark || prefersReducedMotion) return;

    const createShootingStar = () => {
      // Generate random angle between 0 and 360 degrees
      const randomAngle = Math.floor(Math.random() * 360);

      const star: ShootingStar = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        delay: 0,
        angle: randomAngle
      };

      setShootingStars(prev => [...prev, star]);

      // Remove star after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== star.id));
      }, 800);
    };

    // Create shooting stars on scroll (dark mode)
    // Create rain drops on scroll (light mode)
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      const scrollY = window.scrollY;

      console.log('Scroll event:', scrollY, 'isDark:', isDark);

      if (scrollY > 50 && now - lastScrollTime > 80) {
        lastScrollTime = now;
        console.log('Triggering effects at scrollY:', scrollY);

        if (isDark) {
          // Dark mode: shooting stars
          console.log('Dark mode - creating stars');
          const count = Math.floor(Math.random() * 5) + 8;
          for (let i = 0; i < count; i++) {
            setTimeout(() => createShootingStar(), i * 60);
          }
        } else {
          // Light mode: rain effect
          // Calculate cloud darkness and scale based on scroll - much more dramatic
          const darkness = Math.min(scrollY / 300, 0.9);
          const scale = Math.min(1 + scrollY / 150, 2.8);
          setCloudDarkness(darkness);
          setCloudScale(scale);

          // Add extra clouds when scrolling - more clouds, bigger sizes
          const cloudCount = Math.floor(scrollY / 100);
          if (cloudCount > extraClouds.length) {
            const newCloud: ExtraCloud = {
              id: Date.now() + Math.random(),
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 70 + 15}%`,
              size: Math.random() * 0.8 + 1.2
            };
            setExtraClouds(prev => [...prev, newCloud]);
          }

          // Create rain drops - more and continuous
          const rainCount = Math.floor(Math.random() * 15) + 20;
          console.log('Creating rain drops:', rainCount, 'darkness:', darkness);
          for (let i = 0; i < rainCount; i++) {
            setTimeout(() => {
              const drop: RainDrop = {
                id: Date.now() + Math.random() * 10000,
                left: `${Math.random() * 100}%`,
                delay: Math.random() * 200
              };
              setRainDrops(prev => {
                console.log('Adding rain drop at', drop.left);
                return [...prev, drop];
              });

              setTimeout(() => {
                setRainDrops(prev => prev.filter(d => d.id !== drop.id));
              }, 1600);
            }, i * 40);
          }
        }
      }

      // Reset clouds when not scrolling (light mode)
      if (!isDark && scrollY < 50) {
        setCloudDarkness(0);
        setCloudScale(1);
        setExtraClouds([]);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Also create shooting star every 5-6 seconds
    const interval = setInterval(() => {
      createShootingStar();
    }, 5000 + Math.random() * 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [isDark, prefersReducedMotion]);

  // Smooth cloud reset when scroll stops
  useEffect(() => {
    if (isDark) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScrollStop = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('Scroll stopped - resetting clouds');
        // Gradually remove extra clouds
        const removeCloudInterval = setInterval(() => {
          setExtraClouds(prev => {
            if (prev.length === 0) {
              clearInterval(removeCloudInterval);
              return prev;
            }
            console.log('Removing cloud, remaining:', prev.length - 1);
            return prev.slice(0, -1);
          });
        }, 300);

        // Gradually reset clouds
        const resetInterval = setInterval(() => {
          setCloudDarkness(prev => {
            if (prev <= 0.05) {
              clearInterval(resetInterval);
              return 0;
            }
            return prev * 0.85;
          });
          setCloudScale(prev => {
            if (Math.abs(prev - 1) < 0.02) {
              return 1;
            }
            return prev - (prev - 1) * 0.15;
          });
        }, 100);
      }, 2500); // 2.5 seconds after scroll stops
    };

    window.addEventListener('scroll', handleScrollStop);
    return () => {
      window.removeEventListener('scroll', handleScrollStop);
      clearTimeout(scrollTimeout);
    };
  }, [isDark]);

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
      className={`relative h-screen flex items-center justify-center overflow-hidden overflow-x-hidden transition-colors duration-700 ${
        isDark
          ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
          : 'bg-gradient-to-br from-sky-400 via-blue-400 to-blue-500'
      }`}
      role="banner"
      aria-label="Bosh sahifa qismi"
    >
      {/* Animated Background - Hidden from screen readers */}
      <div className="absolute inset-0" aria-hidden="true">
        {!prefersReducedMotion && (
          <>
            {/* Light mode: Sun and clouds */}
            {!isDark && (
              <>
                {/* Sun */}
                <div className="absolute top-20 right-20 w-24 h-24 opacity-30">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-0 bg-yellow-200 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
                </div>

                {/* Clouds with dynamic darkness and scale */}
                <div
                  className="absolute top-32 left-[10%] transition-all duration-300 ease-out"
                  style={{
                    opacity: 0.2 + cloudDarkness * 0.5,
                    transform: `scale(${cloudScale})`,
                    filter: `brightness(${1 - cloudDarkness * 0.6})`
                  }}
                >
                  <div className="flex items-center animate-float-slow">
                    <div className="w-20 h-12 bg-white rounded-full" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    <div className="w-16 h-10 bg-white rounded-full -ml-8" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    <div className="w-24 h-14 bg-white rounded-full -ml-10" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                  </div>
                </div>

                <div
                  className="absolute top-48 right-[15%] transition-all duration-300 ease-out"
                  style={{
                    opacity: 0.2 + cloudDarkness * 0.5,
                    transform: `scale(${cloudScale})`,
                    filter: `brightness(${1 - cloudDarkness * 0.6})`
                  }}
                >
                  <div className="flex items-center animate-float-slow" style={{ animationDelay: '1s' }}>
                    <div className="w-16 h-10 bg-white rounded-full" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    <div className="w-20 h-12 bg-white rounded-full -ml-6" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    <div className="w-14 h-9 bg-white rounded-full -ml-8" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                  </div>
                </div>

                <div
                  className="absolute top-[60%] left-[20%] transition-all duration-300 ease-out"
                  style={{
                    opacity: 0.15 + cloudDarkness * 0.5,
                    transform: `scale(${cloudScale})`,
                    filter: `brightness(${1 - cloudDarkness * 0.6})`
                  }}
                >
                  <div className="flex items-center animate-float-slow" style={{ animationDelay: '2s' }}>
                    <div className="w-18 h-11 bg-white rounded-full" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    <div className="w-22 h-13 bg-white rounded-full -ml-7" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                  </div>
                </div>

                {/* Extra clouds added on scroll */}
                {extraClouds.map((cloud) => (
                  <div
                    key={cloud.id}
                    className="absolute transition-all duration-1000 ease-out"
                    style={{
                      left: cloud.left,
                      top: cloud.top,
                      opacity: 0.3 + cloudDarkness * 0.4,
                      transform: `scale(${cloud.size * cloudScale})`,
                      filter: `brightness(${1 - cloudDarkness * 0.6})`
                    }}
                  >
                    <div className="flex items-center animate-float-slow">
                      <div className="w-16 h-10 bg-white rounded-full" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                      <div className="w-20 h-12 bg-white rounded-full -ml-6" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                      <div className="w-14 h-9 bg-white rounded-full -ml-8" style={{ backgroundColor: `rgb(${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120}, ${255 - cloudDarkness * 120})` }}></div>
                    </div>
                  </div>
                ))}

                {/* Rain drops */}
                {rainDrops.map((drop) => (
                  <div
                    key={drop.id}
                    className="absolute w-1 h-16 bg-gradient-to-b from-blue-400 via-blue-300 to-transparent animate-rain rounded-full"
                    style={{
                      left: drop.left,
                      top: '0',
                      animationDelay: `${drop.delay}ms`,
                      boxShadow: '0 0 2px rgba(59, 130, 246, 0.5)'
                    }}
                  />
                ))}
              </>
            )}

            {/* Dark mode: Moon and stars */}
            {isDark && (
              <>
                {/* Moon */}
                <div className="absolute top-16 right-24 w-20 h-20 opacity-40">
                  <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
                  {/* Moon craters */}
                  <div className="absolute top-3 left-4 w-3 h-3 bg-gray-300 rounded-full opacity-50"></div>
                  <div className="absolute top-8 left-10 w-4 h-4 bg-gray-300 rounded-full opacity-40"></div>
                  <div className="absolute top-12 left-5 w-2 h-2 bg-gray-300 rounded-full opacity-60"></div>
                  {/* Moon glow */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-30 animate-pulse" style={{ animationDuration: '4s' }}></div>
                </div>

                {/* Static stars background - fixed positions */}
                <div className="absolute inset-0">
                  {staticStars.map((star) => (
                    <div
                      key={`star-${star.id}`}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: star.top,
                        left: star.left,
                        opacity: star.opacity,
                        animation: `twinkle ${star.duration}s ease-in-out infinite`,
                        animationDelay: `${star.delay}s`
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-blue-600/50 via-blue-700/50 to-blue-800/50'
            : 'bg-gradient-to-br from-sky-400/30 via-blue-400/30 to-blue-500/30'
        }`}></div>
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

            {/* Shooting stars - only in dark mode */}
            {isDark && shootingStars.map((star) => {
              const angleInRadians = (star.angle * Math.PI) / 180;
              const distance = 400;
              const translateX = Math.cos(angleInRadians) * distance;
              const translateY = Math.sin(angleInRadians) * distance;
              // Calculate rotation so tail is always behind
              const rotationAngle = star.angle;

              return (
                <div
                  key={star.id}
                  className="absolute w-1 h-1 bg-white rounded-full shooting-star-random"
                  style={{
                    left: star.left,
                    top: star.top,
                    boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.8)',
                    '--translate-x': `${translateX}px`,
                    '--translate-y': `${translateY}px`,
                    '--rotation-angle': `${rotationAngle}deg`
                  } as React.CSSProperties & { '--translate-x': string; '--translate-y': string; '--rotation-angle': string }}
                />
              );
            })}
          </>
        )}
      </div>

      <div className="relative z-10 text-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8 xl:px-10 max-w-7xl mx-auto w-full pt-28 xs:pt-32 sm:pt-36 md:pt-38 lg:pt-40 pb-8 xs:pb-12 sm:pb-14 md:pb-16 lg:pb-18">
        <div className="mb-2 xs:mb-3 sm:mb-3 md:mb-4 lg:mb-4 animate-fade-in-up">
          <Bot
            className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 mx-auto mb-2 xs:mb-3 sm:mb-3 md:mb-3 lg:mb-4 text-white ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
            style={{ animationDuration: '2s' }}
            aria-hidden="true"
          />
        </div>

        <h1
          className={`${typography.heroMain} text-white mb-2 xs:mb-3 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 animate-fade-in-up animation-delay-200 leading-tight`}
          id="main-content"
          tabIndex={-1}
          aria-label="Torex IT kompaniyasining bosh sahifasi"
        >
          <span className={`inline-block ${!prefersReducedMotion ? 'animate-pulse' : ''}`}>Biz</span>{' '}
          <span className={`inline-block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent ${!prefersReducedMotion ? 'animate-pulse animation-delay-400' : ''}`}>
            Yaratamiz
          </span>
        </h1>

        <div className="min-h-[3.5rem] xs:min-h-[4rem] sm:min-h-[4rem] md:min-h-[4.5rem] lg:min-h-[5rem] flex items-center justify-center mb-4 xs:mb-5 sm:mb-5 md:mb-6 lg:mb-6 px-2">
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
            
            <span role="text" className="break-words hyphens-auto max-w-full">
              {currentText || texts[currentIndex]}
              {!prefersReducedMotion && <span className="animate-pulse text-white" aria-hidden="true">|</span>}
            </span>
          </div>
        </div>

        <p className={`${typography.heroSubtitle} text-blue-100 mb-5 xs:mb-5 sm:mb-5 md:mb-6 lg:mb-7 max-w-xl xs:max-w-xl sm:max-w-2xl md:max-w-2xl lg:max-w-2xl mx-auto animate-fade-in-up animation-delay-800 leading-relaxed px-2`}>
          G'oyalarni zamonaviy texnologiyalar va innovatsion yechimlar bilan raqamli haqiqatga aylantiramiz.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-4 justify-center items-center animate-fade-in-up animation-delay-1000 mb-5 xs:mb-6 sm:mb-7 md:mb-8 lg:mb-8">
          <button
            onClick={() => scrollToSection('about')}
            className={`w-full xs:w-auto sm:w-auto group bg-white text-blue-600 px-6 xs:px-7 sm:px-7 md:px-8 lg:px-9 py-2.5 xs:py-2.5 sm:py-3 md:py-3 lg:py-3 rounded-full ${typography.button} hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/20 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[140px] xs:min-w-[145px] sm:min-w-[150px]`}
            aria-label="Biz haqimizda qismiga o'tish"
          >
            <span className="relative z-10">Boshlash</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`w-full xs:w-auto sm:w-auto group border-2 border-white text-white px-6 xs:px-7 sm:px-7 md:px-8 lg:px-9 py-2.5 xs:py-2.5 sm:py-3 md:py-3 lg:py-3 rounded-full ${typography.button} hover:bg-white hover:text-blue-600 transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 min-w-[140px] xs:min-w-[145px] sm:min-w-[150px]`}
            aria-label="Portfolio qismiga o'tish"
          >
            <span className="relative z-10">Portfolio ko'rish</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        <div
          className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-5 max-w-sm xs:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto animate-fade-in-up animation-delay-1200"
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
              className="group flex flex-col items-center text-white/90 cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-lg p-2 xs:p-3 sm:p-3 md:p-4 lg:p-5"
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
              <div className="relative mb-1.5 xs:mb-2 sm:mb-2 md:mb-2.5">
                <item.icon
                  className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 group-hover:scale-110 transition-transform duration-500"
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

      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 md:bottom-10 left-0 right-0 flex justify-center z-20">
        <button
          onClick={() => scrollToSection('about')}
          className={`text-white cursor-pointer hover:scale-125 active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-full p-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
          style={{ animationDuration: '2s' }}
          aria-label="Keyingi qismga o'tish - Biz haqimizda"
        >
          <ChevronDown className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
