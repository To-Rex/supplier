import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const isPortfolioReturn = sessionStorage.getItem('portfolioScrollPosition');

    if (location.pathname === '/' && isPortfolioReturn) {
      const scrollPosition = parseInt(isPortfolioReturn, 10);
      sessionStorage.removeItem('portfolioScrollPosition');

      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant'
        });
      }, 100);
    } else if (!location.pathname.startsWith('/portfolio/')) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
