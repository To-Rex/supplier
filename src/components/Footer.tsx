import React from 'react';
import { Code2, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getTextColors } from '../utils/typography';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  return (
    <footer className={`py-16 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-600" />
              <span className={`text-2xl font-bold ${textColors.primary}`}>Torex IT</span>
            </div>
            <p className={textColors.secondary}>Professional IT yechimlar va zamonaviy texnologiyalar</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${textColors.primary} mb-4`}>Xizmatlar</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Veb Dasturlash</a></li>
              <li><a href="#" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Mobil Ilovalar</a></li>
              <li><a href="#" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Telegram Botlar</a></li>
              <li><a href="#" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>CRM Tizimlar</a></li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${textColors.primary} mb-4`}>Kompaniya</h3>
            <ul className="space-y-2">
              <li><a href="#about" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Biz haqimizda</a></li>
              <li><a href="#portfolio" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Portfolio</a></li>
              <li><a href="#blog" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Blog</a></li>
              <li><a href="#contact" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Aloqa</a></li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg font-semibold ${textColors.primary} mb-4`}>Aloqa</h3>
            <ul className="space-y-2">
              <li className={textColors.secondary}>Toshkent, O'zbekiston</li>
              <li><a href="tel:+998901234567" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>+998 90 123 45 67</a></li>
              <li><a href="mailto:info@torexdev.uz" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>info@torexdev.uz</a></li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${textColors.secondary}`}>© 2024 Torex IT. Barcha huquqlar himoyalangan.</p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Maxfiylik Siyosati</a>
              <a href="/terms-of-service" className={`${textColors.secondary} hover:text-blue-600 transition-colors`}>Foydalanish Shartlari</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
