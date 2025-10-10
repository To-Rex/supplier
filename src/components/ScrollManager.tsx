import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/portfolio/')) {
      return;
    }

    const savedScrollPosition = sessionStorage.getItem('portfolioScrollPosition');

    if (location.pathname === '/' && savedScrollPosition) {
      const scrollPosition = parseInt(savedScrollPosition, 10);
      sessionStorage.removeItem('portfolioScrollPosition');

      const scrollToPosition = () => {
        window.scrollTo(0, scrollPosition);
      };

      if (document.readyState === 'complete') {
        requestAnimationFrame(scrollToPosition);
      } else {
        window.addEventListener('load', () => {
          requestAnimationFrame(scrollToPosition);
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
