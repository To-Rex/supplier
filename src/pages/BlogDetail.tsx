import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Eye, Tag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase } from '../lib/supabase';
import SEOOptimizer from '../components/SEOOptimizer';

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
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[];
  published_at: string;
  views_count: number;
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleBackClick = () => {
    navigate('/#blog');
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching blog post:', error);
        } else if (data) {
          setPost(data);

          await supabase.rpc('increment_blog_views', { blog_id: data.id });
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}>
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className={`mt-4 ${typography.bodyLarge} ${textColors.secondary}`}>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}>
        <div className="text-center">
          <h1 className={`${typography.h2} ${textColors.heading} mb-4`}>Maqola topilmadi</h1>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Blogga qaytish</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOOptimizer
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.keywords}
        ogImage={post.image_url}
      />

      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}>
        <article>
          {/* Hero Section */}
          <div className={`relative overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
          }`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Blog</span>
              </button>

              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>

                <h1 className={`${typography.h1} text-white font-bold leading-tight`}>
                  {post.title}
                </h1>

                <div className="flex items-center flex-wrap gap-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.published_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.read_time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{post.views_count} ko'rildi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className={`p-8 rounded-2xl transition-colors duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
                }`}>
                  <div className={`${typography.body} ${textColors.body} leading-relaxed space-y-6`}>
                    {post.content.split('\n').map((paragraph, index) => (
                      paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {post.keywords.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h3 className={`${typography.h5} ${textColors.heading} mb-4 flex items-center`}>
                        <Tag className="w-5 h-5 mr-2" />
                        Kalit So'zlar
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                              isDark
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                            }`}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className={`p-6 rounded-2xl sticky top-24 transition-colors duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
                }`}>
                  <h3 className={`${typography.h5} ${textColors.heading} mb-4`}>
                    Maqola haqida
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>Muallif</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {post.author}
                      </div>
                    </div>

                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>Kategoriya</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {post.category}
                      </div>
                    </div>

                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>O'qish vaqti</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {post.read_time}
                      </div>
                    </div>

                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>Ko'rishlar</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {post.views_count}
                      </div>
                    </div>

                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>Nashr etilgan</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {new Date(post.published_at).toLocaleDateString('uz-UZ', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Blogga Qaytish</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <style>{`
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </>
  );
};

export default BlogDetail;
