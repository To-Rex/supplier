import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hero', 'about', 'services', 'portfolio', 'contact', 'blog'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('[data-mobile-toggle]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      // Announce navigation to screen readers
      const announcement = `${sectionId === 'hero' ? 'Bosh sahifa' : sectionId} qismiga o'tildi`;
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.textContent = announcement;
      document.body.appendChild(liveRegion);
      setTimeout(() => document.body.removeChild(liveRegion), 1000);
    }
  };

  const isHeroSection = activeSection === 'hero';
  const textColor = isHeroSection ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900');
  const logoColor = isHeroSection ? 'text-white' : 'text-blue-600';
  const headerBg = isScrolled && !isHeroSection
    ? (isDark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700' : 'bg-white/95 backdrop-blur-md shadow-lg')
    : 'bg-transparent';

  const navigationItems = [
    { id: 'hero', label: 'Bosh sahifa' },
    { id: 'about', label: 'Biz haqimizda' },
    { id: 'services', label: 'Xizmatlar' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
            onClick={() => scrollToSection('hero')}
            role="button"
            tabIndex={0}
            aria-label="Supplier IT bosh sahifaga o'tish"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection('hero');
              }
            }}
          >
            <Bot className={`w-7 h-7 lg:w-8 lg:h-8 transition-all duration-500 ${logoColor} hover:rotate-12`} aria-hidden="true" />
            <span className={`text-lg lg:text-xl font-bold transition-all duration-500 ${textColor}`}>
              Supplier IT
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <nav className="flex space-x-4 lg:space-x-6" role="navigation" aria-label="Asosiy navigatsiya">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${textColor} hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : ''
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm lg:text-base font-medium transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Bog'lanish qismiga o'tish"
              >
                Bog'lanish
              </button>
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              data-mobile-toggle
              className="md:hidden p-2 transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 transition-all duration-300 ${textColor}`} aria-hidden="true" />
              ) : (
                <Menu className={`w-6 h-6 transition-all duration-300 ${textColor}`} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className={`md:hidden backdrop-blur-md border-t py-4 animate-fade-in-up rounded-b-2xl shadow-xl ${
              isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
            }`}
            role="navigation"
            aria-label="Mobil navigatsiya"
          >
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left transition-all duration-300 text-sm font-medium px-4 py-2 rounded-lg transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeSection === item.id
                      ? `text-blue-600 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`
                      : `${isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && <span className="ml-2 text-blue-400" aria-hidden="true">●</span>}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm font-medium mx-4 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Bog'lanish qismiga o'tish"
              >
                Bog'lanish
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Asosiy kontentga o'tish
      </a>
    </header>
  );
};

export default Header;
