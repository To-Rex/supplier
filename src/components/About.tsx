import React from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const About: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  const stats = [
    { icon: Users, label: 'Mijozlar', value: '100+' },
    { icon: Target, label: 'Loyihalar', value: '200+' },
    { icon: Award, label: 'Tajriba', value: '5+ yil' },
    { icon: TrendingUp, label: 'Mamnunlik', value: '98%' },
  ];

  return (
    <section id="about" className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>
            Biz Haqimizda
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto`}>
            Torex IT - O'zbekistondagi professional IT kompaniya. 
            Biz zamonaviy texnologiyalar yordamida biznesingizni rivojlantirishga yordam beramiz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className={`text-3xl font-bold ${textColors.primary} mb-2`}>
                {stat.value}
              </div>
              <div className={`text-sm ${textColors.secondary}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
