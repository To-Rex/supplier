export const getInputStyles = (isDark: boolean) => {
  const baseStyles = "w-full px-6 py-4 rounded-xl border-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300";
  const themeStyles = isDark 
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500";
  
  return `${baseStyles} ${themeStyles}`;
};

export const getTextareaStyles = (isDark: boolean) => {
  const baseStyles = "w-full px-6 py-4 rounded-xl border-2 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none group-hover:border-blue-300";
  const themeStyles = isDark 
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500";
  
  return `${baseStyles} ${themeStyles}`;
};
