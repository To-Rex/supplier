import React, { useEffect } from 'react';
import { Map, Home, Users, Briefcase, FolderOpen, BookOpen, Mail, Shield, FileText, Scale, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Sitemap: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sitemapSections = [
    {
      title: "Asosiy Sahifalar",
      icon: Home,
      color: "blue",
      links: [
        { name: "Bosh sahifa", path: "/", icon: Home, description: "Torex IT asosiy sahifasi" },
        { name: "Biz Haqimizda", path: "/#about", icon: Users, description: "Bizning jamoa va missiyamiz haqida" },
        { name: "Xizmatlar", path: "/#services", icon: Briefcase, description: "Bizning xizmatlarimiz ro'yxati" },
        { name: "Portfolio", path: "/#portfolio", icon: FolderOpen, description: "Amalga oshirilgan loyihalar" },
        { name: "Blog", path: "/#blog", icon: BookOpen, description: "Maqolalar va yangiliklar" },
        { name: "Aloqa", path: "/#contact", icon: Mail, description: "Biz bilan bog'lanish" }
      ]
    },
    {
      title: "Xizmatlar",
      icon: Briefcase,
      color: "green",
      links: [
        { name: "Veb Dasturlash", path: "/#services", icon: Briefcase, description: "Zamonaviy veb-saytlar yaratish" },
        { name: "Mobil Ilovalar", path: "/#services", icon: Briefcase, description: "iOS va Android ilovalar" },
        { name: "Telegram Botlar", path: "/#services", icon: Briefcase, description: "Biznesingiz uchun botlar" },
        { name: "UI/UX Dizayn", path: "/#services", icon: Briefcase, description: "Zamonaviy va intuitiv dizayn" },
        { name: "Backend Dasturlash", path: "/#services", icon: Briefcase, description: "Kuchli server yechimlari" },
        { name: "Maslahat", path: "/#services", icon: Briefcase, description: "Professional IT konsalting" }
      ]
    },
    {
      title: "Admin Panel",
      icon: User,
      color: "gray",
      links: [
        { name: "Admin Kirish", path: "/admin/login", icon: User, description: "Administrator uchun kirish" },
        { name: "Dashboard", path: "/admin/dashboard", icon: Home, description: "Boshqaruv paneli" },
        { name: "Jamoa Boshqaruvi", path: "/admin/team", icon: Users, description: "Jamoa a'zolarini boshqarish" },
        { name: "Xabarlar", path: "/admin/messages", icon: Mail, description: "Foydalanuvchi xabarlari" }
      ]
    },
    {
      title: "Huquqiy Hujjatlar",
      icon: Scale,
      color: "red",
      links: [
        { name: "Maxfiylik Siyosati", path: "/privacy-policy", icon: Shield, description: "Ma'lumotlar maxfiyligi haqida" },
        { name: "Xizmat Shartlari", path: "/terms-of-service", icon: FileText, description: "Foydalanish shartlari" },
        { name: "Sayt Xaritasi", path: "/sitemap", icon: Map, description: "Sayt tuzilmasi" }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: isDark ? 'bg-blue-600/20' : 'bg-blue-100',
        text: isDark ? 'text-blue-400' : 'text-blue-600',
        border: isDark ? 'border-blue-700' : 'border-blue-200',
        hover: isDark ? 'hover:bg-blue-600/30' : 'hover:bg-blue-50'
      },
      green: {
        bg: isDark ? 'bg-green-600/20' : 'bg-green-100',
        text: isDark ? 'text-green-400' : 'text-green-600',
        border: isDark ? 'border-green-700' : 'border-green-200',
        hover: isDark ? 'hover:bg-green-600/30' : 'hover:bg-green-50'
      },
      gray: {
        bg: isDark ? 'bg-gray-600/20' : 'bg-gray-100',
        text: isDark ? 'text-gray-400' : 'text-gray-600',
        border: isDark ? 'border-gray-700' : 'border-gray-200',
        hover: isDark ? 'hover:bg-gray-600/30' : 'hover:bg-gray-50'
      },
      red: {
        bg: isDark ? 'bg-red-600/20' : 'bg-red-100',
        text: isDark ? 'text-red-400' : 'text-red-600',
        border: isDark ? 'border-red-700' : 'border-red-200',
        hover: isDark ? 'hover:bg-red-600/30' : 'hover:bg-red-50'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
      }`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl animate-float">
                <Map className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className={`${typography.h1} text-white font-bold`}>
              Sayt Xaritasi
            </h1>
            <p className={`${typography.lead} text-blue-100 max-w-3xl mx-auto leading-relaxed`}>
              Torex IT saytidagi barcha sahifalar va bo'limlar tuzilishi.
              Qidirayotgan ma'lumotingizni tezda topishingiz uchun qulay navigatsiya.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-current to-transparent opacity-10"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sitemapSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            const colorClasses = getColorClasses(section.color);

            return (
              <div
                key={sectionIndex}
                className={`rounded-2xl p-8 transition-all duration-500 transform hover:scale-[1.02] ${
                  isDark
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-100 shadow-lg'
                }`}
                style={{
                  animationDelay: `${sectionIndex * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
                    <SectionIcon className={`w-7 h-7 ${colorClasses.text}`} />
                  </div>
                  <h2 className={`${typography.h3} font-semibold ${textColors.heading}`}>
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => {
                    const LinkIcon = link.icon;
                    const isExternal = link.path.startsWith('/#');

                    return (
                      <div key={linkIndex}>
                        {isExternal ? (
                          <a
                            href={link.path}
                            className={`group flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 border ${colorClasses.border} ${colorClasses.hover}`}
                          >
                            <LinkIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorClasses.text}`} />
                            <div className="flex-1">
                              <div className={`${typography.body} font-medium ${textColors.heading} group-hover:${colorClasses.text} transition-colors duration-300`}>
                                {link.name}
                              </div>
                              <p className={`${typography.small} ${textColors.muted} mt-1`}>
                                {link.description}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <Link
                            to={link.path}
                            className={`group flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 border ${colorClasses.border} ${colorClasses.hover}`}
                          >
                            <LinkIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorClasses.text}`} />
                            <div className="flex-1">
                              <div className={`${typography.body} font-medium ${textColors.heading} group-hover:${colorClasses.text} transition-colors duration-300`}>
                                {link.name}
                              </div>
                              <p className={`${typography.small} ${textColors.muted} mt-1`}>
                                {link.description}
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className={`mt-16 p-8 rounded-2xl text-center transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        }`}>
          <Mail className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`${typography.h3} font-semibold mb-3 ${textColors.heading}`}>
            Qidirayotgan Ma'lumotingizni Topa Olmadingizmi?
          </h3>
          <p className={`${typography.body} mb-6 ${textColors.body}`}>
            Biz sizga yordam berishdan xursandmiz. Biz bilan bog'laning!
          </p>
          <a
            href="/#contact"
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>Biz Bilan Bog'laning</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Sitemap;
