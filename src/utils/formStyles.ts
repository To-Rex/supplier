export const getInputStyles = (isDark: boolean) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2';

  if (isDark) {
    return `${baseStyles} bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20`;
  }

  return `${baseStyles} bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20`;
};

export const getButtonStyles = (isDark: boolean, variant: 'primary' | 'secondary' = 'primary') => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2';

  if (variant === 'primary') {
    return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50`;
  }

  if (isDark) {
    return `${baseStyles} bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 focus:ring-gray-500/50`;
  }

  return `${baseStyles} bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500/50`;
};
