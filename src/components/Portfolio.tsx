import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase } from '../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  slug: string;
}

const Portfolio: React.FC = () => {
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('id, title, description, image_url, category, slug')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(6);

        if (error) throw error;
        if (data) setProjects(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`${typography.h2} ${textColors.primary} mb-4`}>
            Bizning Portfolio
          </h2>
          <p className={`${typography.bodyLarge} ${textColors.secondary} max-w-3xl mx-auto`}>
            Muvaffaqiyatli amalga oshirilgan loyihalarimiz
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              Loyihalar tez orada qo'shiladi
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-3">
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-bold ${textColors.primary} mb-2`}>
                    {project.title}
                  </h3>
                  <p className={`${textColors.secondary} mb-4`}>{project.description}</p>
                  <a
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <span>Batafsil</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
