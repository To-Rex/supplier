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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Post - Takes 2 columns */}
          <div className="lg:col-span-2">
            <article className={`rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer h-full ${
              isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' : 'bg-white'
            }`}>
              <div className="relative overflow-hidden h-80">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg ${getCategoryColor(blogPosts[0].category)}`}>
                    {blogPosts[0].category}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-3xl font-bold mb-3 leading-tight">
                    {blogPosts[0].title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className={`${typography.bodyLarge} ${textColors.secondary} leading-relaxed`}>
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(blogPosts[0].date).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Batafsil</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Side Posts - Takes 1 column */}
          <div className="space-y-6">
            {blogPosts.slice(1, 4).map((post) => (
              <article
                key={post.id}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug ${textColors.primary}`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${textColors.secondary}`}>
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-xs pt-4 border-t ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </article>
            ))}
          </div>
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
