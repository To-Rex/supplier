import React, { useEffect } from 'react';
import { Shield, Lock, Eye, UserCheck, Database, Globe, Mail, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import SEOOptimizer from '../components/SEOOptimizer';

const PrivacyPolicy: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "1. Ma'lumotlar To'plash",
      content: "Biz sizning shaxsiy ma'lumotlaringizni faqat xizmatlarimizni taqdim etish uchun to'playmiz. Bu ma'lumotlarga ism, email manzil, telefon raqami va boshqa kontakt ma'lumotlari kiradi. Biz sizning ma'lumotlaringizni faqat sizning roziligingiz bilan to'playmiz."
    },
    {
      icon: Lock,
      title: "2. Ma'lumotlardan Foydalanish",
      content: "To'plangan ma'lumotlar faqat xizmatlarimizni yaxshilash, sizga yangilanishlar haqida xabar berish va aloqa qilish uchun ishlatiladi. Biz sizning ma'lumotlaringizni hech qachon uchinchi shaxslarga sotmaymiz yoki ijarasiga bermaymiz."
    },
    {
      icon: Database,
      title: "3. Ma'lumotlar Xavfsizligi",
      content: "Sizning shaxsiy ma'lumotlaringizni himoya qilish bizning ustuvor vazifamizdir. Biz zamonaviy shifrlash texnologiyalari va xavfsizlik protokollaridan foydalanamiz. Barcha ma'lumotlar shifrlangan serverlarida saqlanadi va maxfiy tutiladi."
    },
    {
      icon: Eye,
      title: "4. Cookielar va Kuzatuv",
      content: "Saytimiz foydalanuvchi tajribasini yaxshilash uchun cookielardan foydalanadi. Siz brauzer sozlamalarida cookielarni o'chirib qo'yishingiz mumkin, ammo bu sayt funksiyalarining cheklangan ishlashiga olib kelishi mumkin."
    },
    {
      icon: UserCheck,
      title: "5. Sizning Huquqlaringiz",
      content: "Siz o'z shaxsiy ma'lumotlaringizga kirish, ularni o'zgartirish yoki o'chirish huquqiga egasiz. Shuningdek, siz bizning xizmatlarimizdan istalgan vaqtda voz kechishingiz mumkin. Buning uchun biz bilan bog'laning."
    },
    {
      icon: Globe,
      title: "6. Uchinchi Tomon Xizmatlari",
      content: "Saytimiz uchinchi tomon xizmatlariga havolalar o'z ichiga olishi mumkin. Biz ularning maxfiylik siyosati uchun javobgar emasmiz. Uchinchi tomon saytlaridan foydalanishdan oldin ularning maxfiylik siyosati bilan tanishib chiqishingizni tavsiya qilamiz."
    },
    {
      icon: Shield,
      title: "7. Bolalar Maxfiyligi",
      content: "Bizning xizmatlarimiz 13 yoshdan katta foydalanuvchilar uchun mo'ljallangan. Biz ongli ravishda 13 yoshdan kichik bolalardan shaxsiy ma'lumotlarni to'plamaymiz. Agar bunday holat aniqlansa, biz darhol ushbu ma'lumotlarni o'chiramiz."
    },
    {
      icon: Mail,
      title: "8. Siyosatdagi O'zgarishlar",
      content: "Biz ushbu maxfiylik siyosatini vaqti-vaqti bilan yangilashimiz mumkin. Barcha o'zgarishlar ushbu sahifada e'lon qilinadi va yangilangan sana ko'rsatiladi. Muntazam ravishda ushbu sahifani tekshirib turishingizni tavsiya qilamiz."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <SEOOptimizer
        title="Maxfiylik Siyosati"
        description="Torex maxfiylik siyosati. Shaxsiy ma'lumotlarni to'plash, ishlatish va himoya qilish haqida batafsil ma'lumot. Sizning ma'lumotlaringiz xavfsizligi bizning ustuvor vazifamiz."
        keywords="maxfiylik siyosati, shaxsiy ma'lumotlar, ma'lumotlar xavfsizligi, GDPR, ma'lumotlar himoyasi, torex it"
        canonicalUrl="https://torexdev.uz/privacy-policy"
      />
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
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className={`${typography.h1} text-white font-bold`}>
              Maxfiylik Siyosati
            </h1>
            <p className={`${typography.lead} text-blue-100 max-w-3xl mx-auto leading-relaxed`}>
              Sizning shaxsiy ma'lumotlaringiz va maxfiyligingiz biz uchun eng muhim.
              Biz sizning ma'lumotlaringizni qanday to'plash, ishlatish va himoya qilishimiz haqida batafsil ma'lumot.
            </p>
            <div className={`${typography.body} text-blue-200 pt-4`}>
              Oxirgi yangilanish: 8 Oktyabr, 2024
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-current to-transparent opacity-10"></div>
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
                  animationDelay: `${index * 100}ms`,
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

        {/* Contact Section */}
        <div className={`mt-16 p-8 rounded-2xl text-center transition-colors duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700'
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        }`}>
          <Mail className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`${typography.h3} font-semibold mb-3 ${textColors.heading}`}>
            Savollaringiz bormi?
          </h3>
          <p className={`${typography.body} mb-6 ${textColors.body}`}>
            Maxfiylik siyosati haqida savollaringiz bo'lsa, biz bilan bog'laning
          </p>
          <a
            href="mailto:dev.dilshodjon@gmail.com"
            className={`inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>Bizga Yozing</span>
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

export default PrivacyPolicy;
