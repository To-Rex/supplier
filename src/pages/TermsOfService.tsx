import React, { useEffect } from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Users, ShieldCheck, CreditCard, XCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const TermsOfService: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: CheckCircle,
      title: "1. Xizmatlardan Foydalanish",
      content: "Torex IT xizmatlaridan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz. Xizmatlarimizdan faqat qonuniy maqsadlarda foydalanishingiz kerak. Har qanday noqonuniy yoki buzg'unchi faoliyat qat'iyan man etiladi."
    },
    {
      icon: Users,
      title: "2. Foydalanuvchi Majburiyatlari",
      content: "Siz to'g'ri va aniq ma'lumotlarni taqdim etishingiz kerak. O'z akkauntingiz xavfsizligi uchun siz javobgarsiz. Parol va kirish ma'lumotlaringizni boshqalar bilan bo'lishmang. Har qanday ruxsatsiz kirishni darhol bizga xabar bering."
    },
    {
      icon: ShieldCheck,
      title: "3. Intellektual Mulk Huquqlari",
      content: "Barcha kontent, dizayn, kod va materiallar Torex IT intellektual mulki hisoblanadi. Ularni nusxalash, tarqatish yoki tijoriy maqsadlarda ishlatish uchun yozma ruxsat olish zarur. Mualliflik huquqini buzish qonuniy ta'qib etiladi."
    },
    {
      icon: CreditCard,
      title: "4. To'lovlar va Qaytarish",
      content: "Barcha to'lovlar O'zbekiston so'mida amalga oshiriladi. Xizmat to'lovi avansdan to'lanadi. Loyiha boshlanganidan keyin qaytarish amalga oshirilmaydi. Maxsus holatlarda qaytarish shartlari alohida kelishiladi."
    },
    {
      icon: Scale,
      title: "5. Mas'uliyatni Cheklash",
      content: "Torex IT xizmatlar sifati uchun mas'ul, ammo uchinchi tomon xizmatlaridan kelib chiqadigan muammolar uchun javobgar emas. Biz texnik nosozliklar, ma'lumotlar yo'qolishi yoki xizmat uzilishlari uchun to'liq mas'uliyat olmaymiz."
    },
    {
      icon: AlertTriangle,
      title: "6. Man Etilgan Harakatlar",
      content: "Tizimni buzishga urinish, viruslar yuborish, spam tarqatish, boshqa foydalanuvchilarning huquqlarini buzish qat'iyan man etiladi. Bunday harakatlar akkauntni bloklash va qonuniy choralar ko'rishga sabab bo'ladi."
    },
    {
      icon: FileText,
      title: "7. Maxfiylik va Ma'lumotlar",
      content: "Sizning shaxsiy ma'lumotlaringiz maxfiy tutiladi va Maxfiylik Siyosatimizga muvofiq qayta ishlanadi. Biz ma'lumotlaringizni uchinchi shaxslarga ruxsatingiz va qonuniy asoslarsiz bermaymiz."
    },
    {
      icon: XCircle,
      title: "8. Xizmatni Bekor Qilish",
      content: "Biz istalgan vaqtda xizmatni bekor qilish yoki o'zgartirish huquqini saqlab qolamiz. Siz ham o'z akkauntingizni istalgan vaqtda yopishingiz mumkin. Bekor qilish holati avval to'langan mablag'lar qaytarilmaydi."
    }
  ];

  const highlights = [
    {
      icon: CheckCircle,
      title: "Professional Xizmat",
      description: "Yuqori sifatli va zamonaviy yechimlar"
    },
    {
      icon: ShieldCheck,
      title: "Xavfsizlik Kafolati",
      description: "Ma'lumotlaringiz himoyalangan"
    },
    {
      icon: Users,
      title: "24/7 Qo'llab-quvvatlash",
      description: "Har doim sizning xizmatingizda"
    }
  ];

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
                <Scale className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className={`${typography.h1} text-white font-bold`}>
              Xizmat Shartlari
            </h1>
            <p className={`${typography.lead} text-blue-100 max-w-3xl mx-auto leading-relaxed`}>
              Torex IT xizmatlaridan foydalanish shartlari va qoidalari.
              Iltimos, xizmatlarimizdan foydalanishdan oldin diqqat bilan o'qib chiqing.
            </p>
            <div className={`${typography.body} text-blue-200 pt-4`}>
              Kuchga kirgan sana: 8 Oktyabr, 2024
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-current to-transparent opacity-10"></div>
      </div>

      {/* Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-sm transition-all duration-500 transform hover:scale-105 ${
                  isDark
                    ? 'bg-gray-800/90 border border-gray-700'
                    : 'bg-white/90 shadow-lg border border-white'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                    <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className={`${typography.h4} font-semibold mb-1 ${textColors.heading}`}>
                      {item.title}
                    </h3>
                    <p className={`${typography.small} ${textColors.muted}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] ${
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700'
                    : 'bg-white hover:shadow-xl border border-gray-100'
                }`}
                style={{
                  animationDelay: `${(index + 3) * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                <div className="flex items-start space-x-5">
                  <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark ? 'bg-blue-600/20' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-7 h-7 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h2 className={`${typography.h3} font-semibold ${textColors.heading}`}>
                      {section.title}
                    </h2>
                    <p className={`${typography.body} leading-relaxed ${textColors.body}`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agreement Section */}
        <div className={`mt-16 p-8 rounded-2xl text-center transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        }`}>
          <AlertTriangle className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <h3 className={`${typography.h3} font-semibold mb-3 ${textColors.heading}`}>
            Muhim Eslatma
          </h3>
          <p className={`${typography.body} mb-6 ${textColors.body} max-w-2xl mx-auto`}>
            Xizmatlarimizdan foydalanish orqali siz ushbu shartlarni to'liq o'qib chiqqan va
            ularga rozilik bildirganingizni tasdiqlaysiz. Agar biror narsa tushunarsiz bo'lsa,
            xizmatdan foydalanishdan oldin biz bilan bog'laning.
          </p>
          <a
            href="/#contact"
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Users className="w-5 h-5" />
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

export default TermsOfService;
