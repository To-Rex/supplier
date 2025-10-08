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
      }, 1500);
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
          // Calculate cloud darkness and scale based on scroll
          const darkness = Math.min(scrollY / 500, 0.7);
          const scale = Math.min(1 + scrollY / 1000, 1.5);
          setCloudDarkness(darkness);
          setCloudScale(scale);

          // Add extra clouds when scrolling
          const cloudCount = Math.floor(scrollY / 200);
          if (cloudCount > extraClouds.length) {
            const newCloud: ExtraCloud = {
              id: Date.now() + Math.random(),
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 70 + 20}%`,
              size: Math.random() * 0.5 + 0.8
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

    // Also create shooting star every 3-4 seconds
    const interval = setInterval(() => {
      createShootingStar();
    }, 3000 + Math.random() * 1000);

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
      className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${
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
                  className="absolute top-32 left-[10%] transition-all duration-700 ease-out"
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
                  className="absolute top-48 right-[15%] transition-all duration-700 ease-out"
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
                  className="absolute top-[60%] left-[20%] transition-all duration-700 ease-out"
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

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <button
          onClick={() => scrollToSection('about')}
          className={`text-white cursor-pointer hover:scale-125 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-full p-2 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}
          style={{ animationDuration: '2s' }}
          aria-label="Keyingi qismga o'tish - Biz haqimizda"
        >
          <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
