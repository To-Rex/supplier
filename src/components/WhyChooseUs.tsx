import React, { useEffect, useRef } from 'react';
import { Award, Users, Clock, Shield, Star, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../utils/typography';

const WhyChooseUs: React.FC = () => {
  const { isDark } = useTheme();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const advantages = [
    {
      icon: Award,
      title: "5+ yillik tajriba",
      description: "IT sohasida boy tajribaga ega professional jamoa bilan ishlang"
    },
    {
      icon: Users,
      title: "100+ mamnun mijoz",
      description: "Bizning xizmatlarimizdan mamnun bo'lgan mijozlar soni"
    },
    {
      icon: Clock,
      title: "Tez yetkazish",
      description: "Loyihalarni belgilangan muddatda va sifatli bajarish"
    },
    {
      icon: Shield,
      title: "Kafolatlangan sifat",
      description: "Har bir loyihaga sifat va ishonchlilik kafolati beramiz"
    },
    {
      icon: Star,
      title: "Innovatsion yechimlar",
      description: "Eng zamonaviy texnologiyalar va innovatsion yondashuv"
    },
    {
      icon: CheckCircle,
      title: "To'liq qo'llab-quvvatlash",
      description: "Loyihadan keyingi texnik qo'llab-quvvatlash xizmatlari"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      className={`py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
      aria-labelledby="why-choose-us-title"
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            id="why-choose-us-title"
            className={`${typography.h2} font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
          >
            Nima uchun Torex-ni tanlash?
          </h2>
          <p className={`${typography.lead} ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
            Biz sizning g'oyalaringizni raqamli haqiqatga aylantirish uchun eng yaxshi tanlovmiz
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => {
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`group p-6 rounded-xl shadow-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
                role="article"
                aria-labelledby={`advantage-${index}-title`}
              >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg transition-all duration-300 group-hover:rotate-12 ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                  <advantage.icon
                    className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3
                id={`advantage-${index}-title`}
                className={`${typography.h3} font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}
              >
                {advantage.title}
              </h3>
              <p className={`${typography.body} ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {advantage.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;