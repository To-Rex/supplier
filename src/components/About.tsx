import React, { useState, useEffect, useRef } from 'react';
import { Users, Award, Clock, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import OptimizedImage from './OptimizedImage';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, projects: 0, experience: 0, countries: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  const finalCounts = { clients: 50, projects: 100, experience: 5, countries: 15 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          clients: Math.floor(finalCounts.clients * progress),
          projects: Math.floor(finalCounts.projects * progress),
          experience: Math.floor(finalCounts.experience * progress),
          countries: Math.floor(finalCounts.countries * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts(finalCounts);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    { icon: Users, number: counts.clients, suffix: '+', label: 'Mamnun Mijozlar', color: 'blue' },
    { icon: Award, number: counts.projects, suffix: '+', label: 'Tugallangan Loyihalar', color: 'green' },
    { icon: Clock, number: counts.experience, suffix: '+', label: 'Yillik Tajriba', color: 'purple' },
    { icon: Globe, number: counts.countries, suffix: '+', label: 'Xizmat Ko\'rsatilgan Mamlakatlar', color: 'pink' },
  ];

  const team = [
    {
      name: 'Dilshodjon Abdullayev',
      role: 'Bosh Dasturchi',
      expertise: 'Full-Stack Dasturlash',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5GFvLggA7jHQW/4UhtlhfuKCa7gAwC5wxknx7eAR/Nx7u0AjG88/8AXb9AoqVk0KGjsHAHTZO+Cjj5f/g==',
      alt: 'Dilshodjon Abdullayev - Bosh Dasturchi'
    },
    {
      name: 'Aziza Karimova',
      role: 'Mobil Ilova Mutaxassisi',
      expertise: 'iOS va Android Dasturlash',
      image: 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5GFvLggA7jHQW/4UhtlhfuKCa7gAwC5wxknx7eAR/Nx7u0AjG88/8AXb9AoqVk0KGjsHAHTZO+Cjj5f/g==',
      alt: 'Aziza Karimova - Mobil Ilova Mutaxassisi'
    },
    {
      name: 'Bobur Rahimov',
      role: 'Bot Dasturchisi',
      expertise: 'Telegram Bot Yaratish',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5GFvLggA7jHQW/4UhtlhfuKCa7gAwC5wxknx7eAR/Nx7u0AjG88/8AXb9AoqVk0KGjsHAHTZO+Cjj5f/g==',
      alt: 'Bobur Rahimov - Bot Dasturchisi'
    },
    {
      name: 'Madina Toshmatova',
      role: 'UI/UX Dizayner',
      expertise: 'Dizayn va Foydalanuvchi Tajribasi',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli5GFvLggA7jHQW/4UhtlhfuKCa7gAwC5wxknx7eAR/Nx7u0AjG88/8AXb9AoqVk0KGjsHAHTZO+Cjj5f/g==',
      alt: 'Madina Toshmatova - UI/UX Dizayner'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      pink: 'from-pink-500 to-pink-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section 
      id="about" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'
      }`} 
      ref={sectionRef}
      aria-labelledby="about-heading"
    >
      {/* Background Animation */}
      <div className="absolute inset-0" aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-float ${
              isDark ? 'bg-blue-400' : 'bg-blue-100'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 
            id="about-heading"
            className={`${typography.h1} ${textColors.primary} mb-6 animate-fade-in-up`}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Supplier IT
            </span>{' '}
            Haqida
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200`}>
            Biz ajoyib raqamli tajribalar yaratishga bag'ishlangan ishtiyoqli dasturchilar va dizaynerlar jamoasimiz. 
            O'zbekistonda joylashgan bo'lib, butun dunyo bo'ylab mijozlarga innovatsion texnologik yechimlar taqdim etamiz.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24" role="list" aria-label="Kompaniya statistikasi">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group text-center cursor-pointer transform hover:scale-110 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
              role="listitem"
              tabIndex={0}
              aria-label={`${stat.number}${stat.suffix} ${stat.label}`}
            >
              <div className={`relative rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(stat.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} aria-hidden="true"></div>
                
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <stat.icon 
                      className="w-16 h-16 text-blue-600 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" 
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" aria-hidden="true"></div>
                  </div>
                  
                  <h3 className={`${typography.statNumber} ${textColors.primary} mb-3 group-hover:text-blue-600 transition-colors duration-300`}>
                    {stat.number}{stat.suffix}
                  </h3>
                  <p className={`${typography.statLabel} ${textColors.secondary} font-medium`}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div>
          <h3 className={`${typography.h2} text-center ${textColors.primary} mb-16 animate-fade-in-up`}>
            Bizning{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mutaxassis Jamoamiz
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Jamoa a'zolari">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
                tabIndex={0}
                aria-label={`${member.name} - ${member.role}. ${member.expertise}`}
              >
                <div className={`rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 text-center relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                  
                  <div className="relative z-10">
                    <div className="relative mb-6">
                      <div className="relative w-28 h-28 mx-auto">
                        <OptimizedImage
                          src={member.image}
                          alt={member.alt}
                          width={112}
                          height={112}
                          className="w-28 h-28 rounded-full object-cover group-hover:scale-110 transition-transform duration-500 shadow-lg"
                          loading="lazy"
                          placeholder={member.placeholder}
                          sizes="112px"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                      </div>
                      
                      {/* Floating particles around image */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
                            style={{
                              left: `${25 + (i * 20)}%`,
                              top: `${30 + (i % 2) * 40}%`,
                              animationDelay: `${i * 0.3}s`,
                              willChange: 'transform, opacity',
                              backfaceVisibility: 'hidden'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h4 className={`${typography.cardTitle} ${textColors.primary} mb-2 group-hover:text-blue-600 transition-colors duration-300`}>
                      {member.name}
                    </h4>
                    <p className={`text-blue-600 ${typography.cardSubtitle} font-semibold mb-2`}>{member.role}</p>
                    <p className={`${typography.cardBody} ${textColors.secondary}`}>{member.expertise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
