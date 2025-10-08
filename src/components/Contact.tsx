import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { getInputStyles } from '../utils/formStyles';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission with animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Yuboring',
      details: 'dev.dilshodjon@gmail.com',
      description: 'Istalgan vaqtda email yuboring!',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Qo\'ng\'iroq Qiling',
      details: '+998 99 534 03 13',
      description: 'Dush-Jum 9:00 dan 18:00 gacha',
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Bizni Ziyorat Qiling',
      details: 'Toshkent, O\'zbekiston',
      description: 'Ofisimizga tashrif buyuring',
      color: 'purple'
    }
  ];

  const subjects = [
    'Veb Dasturlash',
    'Mobil Ilova Dasturlash',
    'Telegram Bot Dasturlash',
    'UI/UX Dizayn',
    'Maslahat',
    'Boshqa'
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="contact" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
    }`} ref={sectionRef}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-30 animate-pulse ${
              isDark ? 'bg-blue-400' : 'bg-blue-200'
            }`}
            style={{
              left: `${(i * 3.5) % 100}%`,
              top: `${(i * 5.5) % 100}%`,
              animationDelay: `${(i * 0.1) % 2}s`,
              animationDuration: '3s',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`${typography.h1} ${textColors.primary} mb-6 animate-fade-in-up`}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bog'laning
            </span>
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200`}>
            Loyihangizni boshlashga tayyormisiz? G\'oyalaringizni hayotga tatbiq etishda qanday yordam bera olishimizni muhokama qilaylik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h3 className={`${typography.h2} ${textColors.primary} mb-12`}>Suhbatni Boshlaylik</h3>
            
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`group flex items-start space-x-6 p-6 rounded-2xl hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                    isDark ? 'hover:bg-gray-800' : 'hover:bg-white'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${getColorClasses(info.color)} group-hover:scale-110 transition-transform duration-500`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className={`${typography.cardTitle} ${textColors.primary} mb-2 group-hover:text-blue-600 transition-colors duration-300`}>
                      {info.title}
                    </h4>
                    <p className={`text-blue-600 font-semibold mb-2 ${typography.cardSubtitle}`}>{info.details}</p>
                    <p className={`${typography.cardBody} ${textColors.secondary}`}>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`rounded-3xl p-8 relative overflow-hidden ${
              isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'
            }`}>
              {/* Animated background elements */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full opacity-30 animate-float ${
                      isDark ? 'bg-blue-500' : 'bg-blue-300'
                    }`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <h4 className={`text-2xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Nega Torex IT ni Tanlash Kerak?</h4>
                <ul className="space-y-4">
                  {[
                    '5+ yillik tajribaga ega mutaxassis jamoa',
                    'Zamonaviy texnologiyalar va eng yaxshi amaliyotlar',
                    'Raqobatbardosh narxlar va tez yetkazib berish',
                    '24/7 qo\'llab-quvvatlash va texnik xizmat',
                    'Biznes ehtiyojlaringiz uchun maxsus yechimlar'
                  ].map((benefit, index) => (
                    <li key={index} className={`flex items-center group ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <form onSubmit={handleSubmit} className={`space-y-8 rounded-3xl p-10 shadow-2xl border transition-all duration-300 ${
              isDark ? 'bg-gray-800/95 border-gray-700 backdrop-blur-sm' : 'bg-white border-gray-100'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className={`block text-sm font-bold mb-3 transition-colors ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    To'liq Ism *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={getInputStyles(isDark)}
                    placeholder="Sizning to'liq ismingiz"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className={`block text-sm font-bold mb-3 transition-colors ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Email Manzil *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={getInputStyles(isDark)}
                    placeholder="sizning@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="phone" className={`block text-sm font-bold mb-3 transition-colors ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Telefon Raqam
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={getInputStyles(isDark)}
                    placeholder="+998 99 534 03 13"
                  />
                </div>
                <div className="group">
                  <label htmlFor="subject" className={`block text-sm font-bold mb-3 transition-colors ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Mavzu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={getInputStyles(isDark)}
                  >
                    <option value="">Xizmatni tanlang</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label htmlFor="message" className={`block text-sm font-bold mb-3 transition-colors ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Xabar *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 rounded-xl border-2 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 resize-none ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 group-hover:border-blue-400 focus:bg-gray-700'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 group-hover:border-blue-300 focus:bg-blue-50/30'
                  }`}
                  placeholder="Loyihangiz haqida bizga ayting..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Xabar Yuborish</span>
                  </>
                )}
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className={`absolute inset-0 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-fade-in-up ${
                isDark ? 'bg-gray-800/95' : 'bg-white/95'
              }`}>
                <div className="text-center p-8">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
                  <h3 className={`text-3xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Xabar Yuborildi!</h3>
                  <p className={`text-xl ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>Xabaringiz uchun rahmat. Tez orada siz bilan bog'lanamiz!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
