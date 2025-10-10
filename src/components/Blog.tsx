import React, { useEffect, useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase } from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  author: string;
  published_at: string;
  read_time: string;
  category: string;
  slug: string;
}

const Blog: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, excerpt, image_url, author, published_at, read_time, category, slug')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        if (data) setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className={`relative py-24 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className={`${typography.h1} ${textColors.primary} mb-4`}>
            So'nggi Maqolalar
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto`}>
            Texnologiya va dasturlash dunyosidagi eng so'nggi ma'lumotlar
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Maqolalar tez orada qo'shiladi
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className={`group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg hover:shadow-2xl'}`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-bold ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                    {post.category}
                  </span>
                  <h3 className={`text-xl font-bold ${textColors.primary} line-clamp-2`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm ${textColors.secondary} line-clamp-3`}>
                    {post.excerpt}
                  </p>
                  <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
