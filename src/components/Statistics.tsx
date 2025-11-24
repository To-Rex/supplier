import React from 'react';
import { Users, Calendar, Briefcase, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../utils/typography';

const Statistics: React.FC = () => {
  const { isDark } = useTheme();

  const stats = [
    {
      icon: Users,
      value: "100+",
      label: "Mamnun mijozlar",
      description: "Bizning xizmatlarimizdan foydalangan mijozlar"
    },
    {
      icon: Calendar,
      value: "5+",
      label: "Yillik tajriba",
      description: "IT sohasidagi boy tajribamiz"
    },
    {
      icon: Briefcase,
      value: "200+",
      label: "Bajarilgan loyihalar",
      description: "Muvaffaqiyatli yakunlangan loyihalar soni"
    },
    {
      icon: Award,
      value: "98%",
      label: "Mijozlar qoniqishi",
      description: "Mijozlarimizning qoniqish darajasi"
    }
  ];

  return (
    <section
      id="statistics"
      className={`py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
      aria-labelledby="statistics-title"
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
            id="statistics-title"
            className={`${typography.h2} ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
          >
            Bizning raqamlarda ifodalanishimiz
          </h2>
          <p className={`${typography.lead} ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Torex-ning muvaffaqiyatlari va yutuqlari raqamlarda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group text-center p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                  : 'bg-white hover:bg-gray-50 border border-gray-200'
              }`}
              role="article"
              aria-labelledby={`stat-${index}-value`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 group-hover:rotate-12 ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <stat.icon className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </div>
              <div
                id={`stat-${index}-value`}
                className={`${typography.h1} font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}
              >
                {stat.value}
              </div>
              <h3 className={`${typography.h3} ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                {stat.label}
              </h3>
              <p className={`${typography.body} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;