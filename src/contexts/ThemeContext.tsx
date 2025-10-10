import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Default to user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme utility functions
export const getThemeClasses = (isDark: boolean) => ({
  bg: isDark ? 'bg-gray-900' : 'bg-white',
  text: isDark ? 'text-white' : 'text-gray-900',
  textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
  surface: isDark ? 'bg-gray-800' : 'bg-white',
  surfaceHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  border: isDark ? 'border-gray-700' : 'border-gray-200',
  borderHover: isDark ? 'hover:border-gray-600' : 'hover:border-gray-300',
  shadow: isDark ? 'shadow-gray-900/50' : 'shadow-gray-500/10',
  input: isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
  card: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
  cardHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
});
