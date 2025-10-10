import React, { useState, useEffect, useRef } from 'react';
import { Code, Smartphone, Bot, Palette, Server, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards one by one
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Veb Dasturlash',
      description: 'Zamonaviy texnologiyalar bilan qurilgan maxsus veb-saytlar va veb-ilovalar.',
      features: ['React & Next.js', 'Moslashuvchan Dizayn', 'SEO Optimallashtirish', 'Samaradorlikka Yo\'naltirilgan'],
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      icon: Smartphone,
      title: 'Mobil Ilovalar',
      description: 'iOS va Android uchun mahalliy va cross-platform mobil ilovalar.',
      features: ['Mahalliy Dasturlash', 'Cross-Platform', 'App Store Nashr', 'Push Bildirishnomalar'],
      color: 'green',
      gradient: 'from-green-500 to-green-700'
    },
    {
      icon: Bot,
      title: 'Telegram Botlar',
      description: 'Biznes avtomatlashtirish va mijozlar bilan muloqot uchun aqlli chatbotlar.',
      features: ['Maxsus Buyruqlar', 'API Integratsiya', 'To\'lov Jarayoni', '24/7 Avtomatlashtirish'],
      color: 'purple',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      icon: Palette,
      title: 'UI/UX Dizayn',
      description: 'Foydalanuvchi tajribasini yaxshilaydigan chiroyli va intuitiv interfeylar.',
      features: ['Foydalanuvchi Tadqiqoti', 'Wireframing', 'Prototiplash', 'Dizayn Tizimlari'],
      color: 'pink',
      gradient: 'from-pink-500 to-pink-700'
    },
    {
      icon: Server,
      title: 'Backend Dasturlash',
      description: 'Mustahkam server tomoni yechimlari va API dasturlash.',
      features: ['REST APIs', 'Ma\'lumotlar Bazasi Dizayni', 'Cloud Deployment', 'Mikroservislar'],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Xavfsizlik va Texnik Xizmat',
      description: 'Keng qamrovli xavfsizlik yechimlari va doimiy texnik xizmat ko\'rsatish.',
      features: ['Xavfsizlik Auditi', 'Muntazam Yangilanishlar', 'Zaxira Yechimlari', '24/7 Monitoring'],
      color: 'red',
      gradient: 'from-red-500 to-red-700'
    }
  ];

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      blue: {
        bg: isHovered ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-blue-600',
        icon: isHovered ? 'text-white' : 'text-blue-500',
        border: 'border-blue-200 hover:border-blue-500',
        shadow: 'hover:shadow-blue-500/25'
      },
      green: {
        bg: isHovered ? 'bg-gradient-to-br from-green-500 to-green-700' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-green-600',
        icon: isHovered ? 'text-white' : 'text-green-500',
        border: 'border-green-200 hover:border-green-500',
        shadow: 'hover:shadow-green-500/25'
      },
      purple: {
        bg: isHovered ? 'bg-gradient-to-br from-purple-500 to-purple-700' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-purple-600',
        icon: isHovered ? 'text-white' : 'text-purple-500',
        border: 'border-purple-200 hover:border-purple-500',
        shadow: 'hover:shadow-purple-500/25'
      },
      pink: {
        bg: isHovered ? 'bg-gradient-to-br from-pink-500 to-pink-700' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-pink-600',
        icon: isHovered ? 'text-white' : 'text-pink-500',
        border: 'border-pink-200 hover:border-pink-500',
        shadow: 'hover:shadow-pink-500/25'
      },
      yellow: {
        bg: isHovered ? 'bg-gradient-to-br from-yellow-500 to-orange-600' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-yellow-600',
        icon: isHovered ? 'text-white' : 'text-yellow-500',
        border: 'border-yellow-200 hover:border-yellow-500',
        shadow: 'hover:shadow-yellow-500/25'
      },
      red: {
        bg: isHovered ? 'bg-gradient-to-br from-red-500 to-red-700' : 'bg-white',
        text: isHovered ? 'text-white' : 'text-red-600',
        icon: isHovered ? 'text-white' : 'text-red-500',
        border: 'border-red-200 hover:border-red-500',
        shadow: 'hover:shadow-red-500/25'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
    }`} ref={sectionRef}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-40 animate-float ${
              isDark ? 'bg-blue-400' : 'bg-blue-200'
            }`}
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${(i * 0.2) % 3}s`,
              animationDuration: '5s',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`${typography.h1} ${textColors.primary} mb-6 animate-fade-in-up`}>
            Bizning{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Xizmatlarimiz
            </span>
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200`}>
            Biznesingizni zamonaviy dunyoda rivojlantirishga yordam beradigan keng qamrovli raqamli yechimlarni taklif etamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isVisible = visibleCards[index];
            const colorClasses = getColorClasses(service.color, isHovered);
            
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-700 transform cursor-pointer ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                } hover:scale-105 hover:shadow-2xl ${colorClasses.border} ${colorClasses.bg} ${colorClasses.shadow}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  transitionDelay: isVisible ? '0s' : `${index * 0.1}s`,
                }}
              >
                {/* Animated particles on hover */}
                {isHovered && (
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                        style={{
                          left: `${15 + (i * 12) % 70}%`,
                          top: `${20 + (i * 8) % 60}%`,
                          animationDelay: `${(i * 0.25) % 1.5}s`,
                          willChange: 'transform, opacity',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="p-8 relative z-10">
                  <div className="relative mb-6">
                    <service.icon className={`w-16 h-16 mb-6 transition-all duration-500 ${colorClasses.icon} ${
                      isHovered ? 'scale-125 rotate-12' : ''
                    }`} />
                    {isHovered && (
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                    )}
                  </div>
                  
                  <h3 className={`${typography.cardTitle} font-bold mb-4 transition-all duration-500 ${colorClasses.text}`}>
                    {service.title}
                  </h3>
                  
                  <p className={`${typography.cardSubtitle} mb-6 transition-all duration-500 leading-relaxed ${
                    isHovered ? 'text-white/90' : (isDark ? 'text-gray-300' : 'text-gray-600')
                  }`}>
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className={`flex items-center ${typography.cardBody} transition-all duration-500 ${
                          isHovered ? 'text-white/80' : (isDark ? 'text-gray-400' : 'text-gray-500')
                        }`}
                        style={{ animationDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-500 ${
                          isHovered ? 'bg-white/60 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        <span className={isHovered ? 'transform translate-x-1' : ''}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Gradient overlay animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-700 ${
                  isHovered ? 'opacity-100' : ''
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
