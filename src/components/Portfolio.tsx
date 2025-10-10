import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate projects one by one
            projects.forEach((_, index) => {
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
  }, []);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platforma',
      description: 'Ilg\'or xususiyatlarga ega zamonaviy onlayn do\'kon',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Fitnes Mobil Ilova',
      description: 'Cross-platform fitnes kuzatuv ilovasi',
      image: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Mijozlarni Qo\'llab-quvvatlash Boti',
      description: 'Mijozlarga xizmat ko\'rsatish uchun AI-ga asoslangan Telegram bot',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'bot',
      technologies: ['Python', 'Telegram API', 'OpenAI'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Korporativ Veb-sayt',
      description: 'CMS bilan professional biznes veb-sayti',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'web',
      technologies: ['Next.js', 'Tailwind', 'Strapi'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Ovqat Yetkazib Berish Ilovasi',
      description: 'Ovqat buyurtma qilish uchun mahalliy mobil ilova',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'mobile',
      technologies: ['Flutter', 'Firebase', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Yangiliklar Yig\'uvchi Bot',
      description: 'Avtomatlashtirilgan yangiliklar yig\'ish va tarqatish boti',
      image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'bot',
      technologies: ['Node.js', 'Telegram API', 'RSS'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'Barcha Loyihalar', color: 'blue' },
    { id: 'web', label: 'Veb Dasturlash', color: 'green' },
    { id: 'mobile', label: 'Mobil Ilovalar', color: 'purple' },
    { id: 'bot', label: 'Telegram Botlar', color: 'pink' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            Eng so\'nggi loyihalarimizni o\'rganing va bizneslarning raqamli maqsadlariga erishishda qanday yordam berganimizni ko\'ring.
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

        {/* Animated Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const isVisible = visibleProjects[index];
            
            return (
              <div
                key={project.id}
                className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform cursor-pointer relative ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                } hover:scale-105`}
                style={{
                  transitionDelay: isVisible ? '0s' : `${index * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  
                  {/* Overlay with animated buttons */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-6">
                    <a
                      href={project.liveUrl}
                      className="bg-white text-blue-600 p-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-125 hover:rotate-12 shadow-xl"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white text-blue-600 p-4 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-125 hover:-rotate-12 shadow-xl"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm rounded-full font-semibold transform hover:scale-110 transition-all duration-300 cursor-pointer"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-3xl transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
