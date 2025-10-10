import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions: { [key: string]: number } = {};

const ScrollManager = () => {
  const location = useLocation();
  const restoring = useRef(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentState = location.state as { fromPortfolio?: boolean } | null;

    if (currentPath.startsWith('/portfolio/') || currentPath.startsWith('/team/')) {
      window.scrollTo(0, 0);
      return;
    }

    if (currentPath === '/' && currentState?.fromPortfolio) {
      restoring.current = true;
      const savedPosition = scrollPositions['/'] || 0;

      setTimeout(() => {
        window.scrollTo(0, savedPosition);
        restoring.current = false;
      }, 50);
    } else if (!currentState?.fromPortfolio) {
      window.scrollTo(0, 0);
    }

    const saveScrollPosition = () => {
      if (!restoring.current) {
        scrollPositions[currentPath] = window.scrollY;
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(saveScrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      saveScrollPosition();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return null;
};

export default ScrollManager;
