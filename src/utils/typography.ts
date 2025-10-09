export const typography = {
  h1: 'text-4xl sm:text-5xl lg:text-6xl',
  h2: 'text-3xl sm:text-4xl lg:text-5xl',
  h3: 'text-2xl sm:text-3xl lg:text-4xl',
  h4: 'text-xl sm:text-2xl lg:text-3xl',
  h5: 'text-lg sm:text-xl lg:text-2xl',
  h6: 'text-base sm:text-lg lg:text-xl',
  lead: 'text-lg sm:text-xl lg:text-2xl',
  body: 'text-base',
  small: 'text-sm',
  xs: 'text-xs'
};

export function getTextColors(isDark: boolean) {
  return {
    primary: isDark ? 'text-white' : 'text-gray-900',
    secondary: isDark ? 'text-gray-300' : 'text-gray-700',
    muted: isDark ? 'text-gray-400' : 'text-gray-600',
    accent: 'text-blue-600'
  };
}
