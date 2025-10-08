import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase, Portfolio as PortfolioType } from '../lib/supabase';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching portfolio from Supabase...');

        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        console.log('Portfolio query result:', { data, error, count: data?.length });

        if (error) {
          console.error('Error fetching portfolio:', error);
          alert('Portfolio ma\'lumotlarini olishda xatolik: ' + error.message);
        } else if (data) {
          console.log('Portfolio items loaded:', data);
          setPortfolioItems(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        alert('Kutilmagan xatolik yuz berdi: ' + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            portfolioItems.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProjects(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [portfolioItems]);

  const filters = [
    { id: 'all', label: 'Barcha Loyihalar', color: 'blue' },
    { id: 'web', label: 'Veb Dasturlash', color: 'green' },
    { id: 'mobile', label: 'Mobil Ilovalar', color: 'purple' },
    { id: 'bot', label: 'Telegram Botlar', color: 'pink' },
    { id: 'design', label: 'Dizayn', color: 'indigo' },
    { id: 'other', label: 'Boshqa', color: 'gray' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(project => project.category === activeFilter);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    // Reset visibility for animation
    setVisibleProjects([]);
    setTimeout(() => {
      filteredProjects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 100);
      });
    }, 100);
  };

  return (
    <section id="portfolio" className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 to-white'
    }`} ref={sectionRef}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-30 animate-pulse ${
              isDark ? 'bg-blue-400' : 'bg-blue-200'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Bizning{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className={`text-xl max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Eng so'nggi loyihalarimizni o'rganing va bizneslarning raqamli maqsadlariga erishishda qanday yordam berganimizni ko'ring.
          </p>

          {/* Animated Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`group px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 relative overflow-hidden ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-lg hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10 flex items-center">
                  <Filter className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  {filter.label}
                </span>
                {activeFilter === filter.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 ${typography.bodyLarge} ${textColors.secondary}`}>Portfolio yuklanmoqda...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className={`${typography.bodyLarge} ${textColors.secondary}`}>
              {activeFilter === 'all'
                ? 'Hozircha portfolio loyihalari mavjud emas.'
                : 'Bu kategoriyada loyihalar topilmadi.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isVisible = visibleProjects[index];

              return (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className={`group ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform cursor-pointer relative border ${isDark ? 'border-gray-700' : 'border-gray-100'} ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                  } hover:scale-[1.02] hover:-translate-y-2`}
                  style={{
                    transitionDelay: isVisible ? '0s' : `${index * 0.1}s`,
                  }}
                >
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={project.image_url}
                      alt={project.meta_title || project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                        isDark ? 'bg-white/20 text-white' : 'bg-black/70 text-white'
                      } shadow-lg`}>
                        {project.category === 'web' ? 'Veb' :
                         project.category === 'mobile' ? 'Mobil' :
                         project.category === 'bot' ? 'Bot' :
                         project.category === 'design' ? 'Dizayn' : 'Boshqa'}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.is_featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse">
                          ⭐ Top
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* Hover Overlay with Buttons */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 to-cyan-600/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-6">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white text-blue-600 p-5 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-125 hover:rotate-6 shadow-2xl"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-7 h-7" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white text-gray-900 p-5 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-125 hover:-rotate-6 shadow-2xl"
                          title="GitHub"
                        >
                          <Github className="w-7 h-7" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-8 relative">
                    {/* Client Name */}
                    {project.client_name && (
                      <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {project.client_name}
                      </p>
                    )}

                    <h3 className={`text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`mb-6 leading-relaxed line-clamp-3 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1.5 text-xs rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 ${
                            isDark
                              ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
                              : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    {project.completion_date && (
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                        📅 {new Date(project.completion_date).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long' })}
                      </p>
                    )}
                  </div>

                  {/* Animated Glow Border */}
                  <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    isDark
                      ? 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                      : 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                  }`}></div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
