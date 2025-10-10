import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ExternalLink, Github, ArrowLeft, Tag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
import { supabase, Portfolio } from '../lib/supabase';
import SEOOptimizer from '../components/SEOOptimizer';

const PortfolioDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleBackClick = () => {
    navigate('/', { state: { fromPortfolio: true } });
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching portfolio:', error);
        } else if (data) {
          setPortfolio(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
    window.scrollTo(0, 0);
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

  if (!portfolio) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}>
        <div className="text-center">
          <h1 className={`${typography.h2} ${textColors.heading} mb-4`}>Loyiha topilmadi</h1>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Portfolioga qaytish</span>
          </button>
        </div>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    web: 'Veb Dasturlash',
    mobile: 'Mobil Ilova',
    bot: 'Telegram Bot',
    design: 'Dizayn',
    other: 'Boshqa'
  };

  return (
    <>
      <SEOOptimizer
        title={portfolio.meta_title || portfolio.title}
        description={portfolio.meta_description || portfolio.description}
        keywords={portfolio.meta_keywords}
        ogImage={portfolio.og_image || portfolio.image_url}
      />

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
            <button
              onClick={handleBackClick}
              className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Portfolio</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                    {categoryLabels[portfolio.category]}
                  </span>
                  {portfolio.is_featured && (
                    <span className="px-4 py-2 bg-yellow-500/20 backdrop-blur-sm text-yellow-200 rounded-full text-sm font-semibold">
                      Tanlangan
                    </span>
                  )}
                </div>

                <h1 className={`${typography.h1} text-white font-bold`}>
                  {portfolio.title}
                </h1>

                <p className={`${typography.lead} text-blue-100 leading-relaxed`}>
                  {portfolio.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {portfolio.live_url && (
                    <a
                      href={portfolio.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Jonli Ko'rish</span>
                    </a>
                  )}
                  {portfolio.github_url && (
                    <a
                      href={portfolio.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="animate-float">
                <img
                  src={portfolio.image_url}
                  alt={portfolio.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className={`p-8 rounded-2xl transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
              }`}>
                <h2 className={`${typography.h3} ${textColors.heading} mb-6`}>
                  Loyiha Haqida
                </h2>
                <div className={`${typography.body} ${textColors.body} leading-relaxed space-y-4`}>
                  {portfolio.full_description ? (
                    portfolio.full_description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{portfolio.description}</p>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className={`p-8 rounded-2xl transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
              }`}>
                <h3 className={`${typography.h4} ${textColors.heading} mb-4 flex items-center`}>
                  <Tag className="w-5 h-5 mr-2" />
                  Ishlatilgan Texnologiyalar
                </h3>
                <div className="flex flex-wrap gap-3">
                  {portfolio.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                        isDark
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
              }`}>
                <h3 className={`${typography.h4} ${textColors.heading} mb-4`}>
                  Loyiha Ma'lumotlari
                </h3>
                <div className="space-y-4">
                  {portfolio.client_name && (
                    <div className="flex items-start space-x-3">
                      <User className={`w-5 h-5 mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <div className={`${typography.small} ${textColors.muted} mb-1`}>Mijoz</div>
                        <div className={`${typography.body} ${textColors.body} font-semibold`}>
                          {portfolio.client_name}
                        </div>
                      </div>
                    </div>
                  )}

                  {portfolio.completion_date && (
                    <div className="flex items-start space-x-3">
                      <Calendar className={`w-5 h-5 mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <div className={`${typography.small} ${textColors.muted} mb-1`}>Tugallangan sana</div>
                        <div className={`${typography.body} ${textColors.body} font-semibold`}>
                          {new Date(portfolio.completion_date).toLocaleDateString('uz-UZ', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <Tag className={`w-5 h-5 mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div>
                      <div className={`${typography.small} ${textColors.muted} mb-1`}>Kategoriya</div>
                      <div className={`${typography.body} ${textColors.body} font-semibold`}>
                        {categoryLabels[portfolio.category]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default PortfolioDetail;
