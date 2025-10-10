import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Update favicon based on theme
function updateFavicon(isDark: boolean) {
  const favicon = document.getElementById('favicon') as HTMLLinkElement;
  if (favicon) {
    const emoji = isDark ? '👨🏼‍💻' : '👨🏿‍💻';
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
  }
}

// Initial favicon setup based on system theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
updateFavicon(isDark);

// Listen for theme changes
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
themeMediaQuery.addEventListener('change', (e) => {
  const storedTheme = localStorage.getItem('theme');
  if (!storedTheme) {
    updateFavicon(e.matches);
  }
});

// Listen for localStorage theme changes
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    const isDark = e.newValue === 'dark';
    updateFavicon(isDark);
  }
});

// Performance optimization: Use createRoot with concurrent features
const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container, {
  // Enable concurrent features for better performance
  onRecoverableError: (error, errorInfo) => {
    console.error('Recoverable error:', error, errorInfo);
  }
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Service Worker registration for caching and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Web Vitals reporting for performance monitoring
if (import.meta.env.PROD) {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    function sendToAnalytics(metric: any) {
      // Replace with your analytics service
      console.log('Web Vital:', metric);
    }

    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }).catch(() => {
    // Silently fail if web-vitals is not available
  });
}
