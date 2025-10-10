// This file contains all the common patterns we need to apply to components

export const commonImports = `
import { useTheme } from '../contexts/ThemeContext';
import { typography, getTextColors } from '../utils/typography';
`;

export const commonComponentSetup = `
  const { isDark } = useTheme();
  const textColors = getTextColors(isDark);
`;

export const sectionBackgrounds = {
  portfolio: (isDark: boolean) => isDark 
    ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 to-white',
  contact: (isDark: boolean) => isDark
    ? 'bg-gradient-to-br from-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-blue-50 to-purple-50',
  blog: (isDark: boolean) => isDark
    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-white to-gray-50',
  footer: (isDark: boolean) => isDark
    ? 'bg-gray-900'
    : 'bg-gray-900'
};

export const cardBackgrounds = (isDark: boolean) => isDark
  ? 'bg-gray-800 border-gray-700'
  : 'bg-white border-gray-200';

export const inputStyles = (isDark: boolean) => isDark
  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
