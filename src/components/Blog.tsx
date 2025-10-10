import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Blog: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  const blogPosts = [
    {
      id: 1,
      title: '2024-yilda Veb Dasturlashning 10 ta Muhim Trendi',
      excerpt: 'AI integratsiyasidan progressiv veb-ilovalargacha, veb dasturlash kelajagini shakllantirayotgan eng so\'nggi trendlarni kashf eting.',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Dilshodjon Abdullayev',
      date: '2024-01-15',
      readTime: '5 daqiqa',
      category: 'Veb Dasturlash'
    },
    {
      id: 2,
      title: 'Mobil Ilova Xavfsizligi: 2024 uchun Eng Yaxshi Amaliyotlar',
      excerpt: 'Ushbu muhim xavfsizlik amaliyotlari bilan mobil ilovalaringizni xavfsizlik tahdidlaridan qanday himoya qilishni o\'rganing.',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Aziza Karimova',
      date: '2024-01-10',
      readTime: '7 daqiqa',
      category: 'Mobil Dasturlash'
    },
    {
      id: 3,
      title: 'AI bilan Aqlli Telegram Botlar Yaratish',
      excerpt: 'Zamonaviy AI texnologiyalari va Telegram Bot API yordamida aqlli chatbotlarni qanday yaratishni o\'rganing.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Bobur Rahimov',
      date: '2024-01-05',
      readTime: '6 daqiqa',
      category: 'Bot Dasturlash'
    },
    {
      id: 4,
      title: 'Yaxshi Foydalanuvchi Tajribasi uchun UI/UX Dizayn Tamoyillari',
      excerpt: 'Jozibali va intuitiv foydalanuvchi interfeyslari yaratadigan asosiy dizayn tamoyillarini o\'zlashtirib oling.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      author: 'Madina Toshmatova',
      date: '2024-01-01',
      readTime: '8 daqiqa',
      category: 'Dizayn'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Veb Dasturlash': isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700',
      'Mobil Dasturlash': isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700',
      'Bot Dasturlash': isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700',
      'Dizayn': isDark ? 'bg-pink-900 text-pink-300' : 'bg-pink-100 text-pink-700'
    };
    return colors[category as keyof typeof colors] || (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700');
  };

  return (
    <section id="blog" className={`py-24 transition-colors duration-300 relative overflow-hidden ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-blue-500' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-purple-500' : 'bg-purple-300'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isDark ? 'bg-blue-900/50 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              📝 Blog & Maqolalar
            </span>
          </div>
          <h2 className={`${typography.h1} ${textColors.primary} mb-4`}>
            So'nggi Ma'lumotlar
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto leading-relaxed`}>
            Texnologiya va dasturlash dunyosidagi eng so'nggi trendlar, maslahatlar va ma'lumotlar bilan yangilanib turing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-700 transform cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border border-gray-700/50'
                  : 'bg-white border border-gray-100'
              } shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] ${
                index === 0 ? 'md:col-span-2 lg:row-span-2' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image Section */}
              <div className={`relative overflow-hidden ${index === 0 ? 'h-80 lg:h-96' : 'h-64'}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                  index === 0
                    ? 'from-black/90 via-black/50 to-transparent'
                    : 'from-black/80 via-black/30 to-transparent group-hover:from-black/90'
                }`}></div>

                {/* Category Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border transition-all duration-300 ${getCategoryColor(post.category)} group-hover:scale-110`}>
                    {post.category}
                  </span>
                </div>

                {/* Featured Badge */}
                {index === 0 && (
                  <div className="absolute top-5 right-5 z-10">
                    <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse border border-white/20">
                      ⭐ Asosiy
                    </span>
                  </div>
                )}

                {/* Title Overlay for Featured Post */}
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className={index === 0 ? 'p-8 lg:p-10' : 'p-6'}>
                {/* Title for non-featured posts */}
                {index !== 0 && (
                  <h3 className={`font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug ${
                    textColors.primary
                  } ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                    {post.title}
                  </h3>
                )}

                {/* Excerpt */}
                <p className={`leading-relaxed mb-5 ${
                  textColors.secondary
                } ${index === 0 ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
                  {post.excerpt}
                </p>

                {/* Meta Info for non-featured posts */}
                {index !== 0 && (
                  <div className={`flex items-center flex-wrap gap-3 text-xs mb-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                )}

                {/* Read More Button */}
                <div className={`flex items-center justify-between pt-5 border-t ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(post.date).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm">Batafsil</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Animated Glow Border */}
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${
                isDark
                  ? 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]'
                  : 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]'
              }`}></div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Barcha Maqolalarni Ko'rish</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
