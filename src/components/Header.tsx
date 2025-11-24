import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const { isDark } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      if (location.pathname === '/') {
        setIsPastHero(scrollY > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

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

  const isHomePage = location.pathname === '/';
  const isTransparentBg = isHomePage && !isPastHero;
  const textColor = isTransparentBg ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900');
  const logoColor = isTransparentBg ? 'text-white' : 'text-blue-600';
  const solidBg = isDark ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700' : 'bg-white/95 backdrop-blur-md shadow-lg';
  const headerBg = isHomePage ? (isPastHero ? solidBg : 'bg-transparent') : (isScrolled ? solidBg : 'bg-transparent');

  const navigationItems = [
    { path: '/', label: 'Bosh sahifa' },
    { path: '/about', label: 'Biz haqimizda' },
    { path: '/services', label: 'Xizmatlar' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:grid md:grid-cols-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1 md:justify-self-start"
            aria-label="Torex IT bosh sahifaga o'tish"
          >
            <img src="/logo.png" alt="Torex IT Logo" className={`w-7 h-7 lg:w-8 lg:h-8 transition-all duration-500 ${logoColor} hover:rotate-12`} />
            <span className={`text-lg lg:text-xl font-bold transition-all duration-500 ${textColor}`}>Torex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-3 lg:space-x-5 xl:space-x-8" role="navigation" aria-label="Asosiy navigatsiya">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-all duration-500 text-sm lg:text-base font-medium hover:scale-105 focus:outline-none rounded-lg px-3 py-2 pb-3 whitespace-nowrap relative group ${
                  location.pathname === item.path
                    ? (isTransparentBg ? 'text-white' : (isDark ? 'text-white' : 'text-blue-600'))
                    : `${textColor} hover:bg-blue-500/10`
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
                {location.pathname === item.path && (
                  <>
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-500 ${
                      isTransparentBg ? 'bg-white w-8' : (isDark ? 'bg-blue-400 w-8' : 'bg-blue-600 w-8')
                    }`} aria-hidden="true"></span>
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 blur-sm animate-pulse ${
                      isTransparentBg ? 'bg-white/50' : (isDark ? 'bg-blue-400/50' : 'bg-blue-600/50')
                    }`} aria-hidden="true"></span>
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center justify-end space-x-3">
            <Link
              to="/contact"
              className="hidden md:block bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm lg:text-base font-medium transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Bog'lanish qismiga o'tish"
            >
              Bog'lanish
            </Link>
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
            className={`md:hidden backdrop-blur-md border-t py-4 animate-fade-in-up rounded-b-2xl shadow-xl relative z-[10000] ${
              isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
            }`}
            role="navigation"
            aria-label="Mobil navigatsiya"
          >
            <nav className="flex flex-col space-y-4 pointer-events-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-left transition-all duration-300 text-sm font-medium px-4 py-2 rounded-lg transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                    location.pathname === item.path
                      ? `text-blue-600 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`
                      : `${isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="ml-2 inline-flex items-center">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                    </span>
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-left bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm font-medium mx-4 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Bog'lanish qismiga o'tish"
              >
                Bog'lanish
              </Link>
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
