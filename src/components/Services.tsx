import React from 'react';
import { Globe, Smartphone, Bot, BarChart, ShoppingCart, Brain } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Services: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  const services = [
    { icon: Globe, title: 'Veb Dasturlash', description: 'Zamonaviy va professional veb-saytlar yaratamiz' },
    { icon: Smartphone, title: 'Mobil Ilovalar', description: 'iOS va Android uchun sifatli ilovalar' },
    { icon: Bot, title: 'Telegram Botlar', description: 'Avtomatlashtirish uchun aqlli botlar' },
    { icon: BarChart, title: 'CRM Tizimlar', description: 'Biznes jarayonlarini boshqarish tizimlari' },
    { icon: ShoppingCart, title: 'E-commerce', description: 'Onlayn savdo platformalari' },
    { icon: Brain, title: 'AI Yechimlar', description: 'Sun\'iy intellekt integratsiyasi' },
  ];

  return (
    <section id="services" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>
            Bizning Xizmatlar
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto`}>
            Biznesingiz uchun to'liq IT yechimlar taqdim etamiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'}`}
            >
              <service.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className={`text-xl font-bold ${textColors.primary} mb-3`}>
                {service.title}
              </h3>
              <p className={textColors.secondary}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
