import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex items-center justify-center w-14 h-8 rounded-full transition-all duration-500 transform hover:scale-105 ${
        isDark
          ? 'bg-gradient-to-r from-gray-800 to-blue-900 shadow-lg shadow-blue-500/25'
          : 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/25'
      }`}
      aria-label={isDark ? 'Light mode ga o\'tish' : 'Dark mode ga o\'tish'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {/* Toggle background */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-yellow-300 to-orange-400'
      }`} />

      {/* Sliding indicator */}
      <div className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform flex items-center justify-center ${
        isDark ? 'translate-x-3' : '-translate-x-3'
      }`}>
        <Sun
          className={`absolute w-3 h-3 text-yellow-500 transition-all duration-500 transform ${
            isDark ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute w-3 h-3 text-blue-600 transition-all duration-500 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Background stars for dark mode */}
      {isDark && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun rays for light mode */}
      {!isDark && (
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-1 bg-white/40 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-8px)`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
