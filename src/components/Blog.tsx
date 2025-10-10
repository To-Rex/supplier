import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  read_time: string;
  published_at: string;
  views_count: number;
}

const Blog: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const POSTS_PER_PAGE = 4;

  useEffect(() => {
    fetchBlogPosts(true);
  }, []);

  const fetchBlogPosts = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentOffset = isInitial ? 0 : offset;
      const from = currentOffset;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (data) {
        if (isInitial) {
          setBlogPosts(data);
          setOffset(data.length);
        } else {
          setBlogPosts(prev => [...prev, ...data]);
          setOffset(prev => prev + data.length);
        }

        const totalFetched = isInitial ? data.length : offset + data.length;
        setHasMore(count ? totalFetched < count : data.length === POSTS_PER_PAGE);
      }
    } catch (error) {
      console.error('Blog yuklashda xatolik:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchBlogPosts(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Veb Dasturlash': isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700',
      'Mobil Dasturlash': isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700',
      'Bot Dasturlash': isDark ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-700',
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
          isDark ? 'bg-teal-500' : 'bg-teal-300'
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${
              isDark ? 'border-blue-400' : 'border-blue-600'
            }`}></div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Hozircha blog postlar mavjud emas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block h-full"
            >
              <article
                className={`group relative rounded-3xl overflow-hidden transition-all duration-700 transform cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border border-gray-700/50'
                  : 'bg-white border border-gray-100'
              } shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] flex flex-col h-full`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border transition-all duration-300 ${getCategoryColor(post.category)} group-hover:scale-110`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-snug min-h-[3.5rem] ${
                  textColors.primary
                }`} style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className={`text-sm leading-relaxed mb-4 flex-grow min-h-[4.5rem] ${
                  textColors.secondary
                }`} style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className={`flex items-center flex-wrap gap-3 text-xs mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.read_time}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className={`flex items-center justify-between pt-4 border-t ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <div className="flex items-center space-x-2 text-xs">
                    <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {new Date(post.published_at).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    <span className="text-xs">Batafsil</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
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
            </Link>
            ))}
          </div>
        )}

        {hasMore && blogPosts.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>Yana Boshqa Maqolalarni Ko'rish</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
