import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();
  const scrollPositions = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const currentPath = location.pathname;
    const currentState = location.state as { fromPortfolio?: boolean } | null;

    if (currentPath.startsWith('/portfolio/')) {
      window.scrollTo(0, 0);
      return;
    }

    if (currentPath === '/' && currentState?.fromPortfolio && scrollPositions.current['/']) {
      const savedPosition = scrollPositions.current['/'];

      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'auto'
        });
      }, 0);
    } else if (currentPath === '/') {
      if (scrollPositions.current['/']) {
        setTimeout(() => {
          window.scrollTo({
            top: scrollPositions.current['/'],
            behavior: 'auto'
          });
        }, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }

    const saveScrollPosition = () => {
      scrollPositions.current[currentPath] = window.scrollY;
    };

    window.addEventListener('scroll', saveScrollPosition, { passive: true });

    return () => {
      saveScrollPosition();
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [location]);

  return null;
};

export default ScrollManager;
