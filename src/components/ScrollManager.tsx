import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_KEY = 'scrollPosition';
const FROM_DETAIL_KEY = 'fromDetailPage';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const isDetailPage = location.pathname.startsWith('/portfolio/') ||
                        location.pathname.startsWith('/team/');

    if (isDetailPage) {
      sessionStorage.setItem(FROM_DETAIL_KEY, 'true');
      window.scrollTo(0, 0);
      return;
    }

    const fromDetailPage = sessionStorage.getItem(FROM_DETAIL_KEY);
    const savedScroll = sessionStorage.getItem(SCROLL_KEY);

    if (location.pathname === '/' && fromDetailPage === 'true' && savedScroll) {
      sessionStorage.removeItem(FROM_DETAIL_KEY);

      const targetScroll = parseInt(savedScroll, 10);

      const scrollToTarget = () => {
        window.scrollTo(0, targetScroll);
      };

      if (document.readyState === 'complete') {
        requestAnimationFrame(scrollToTarget);
      } else {
        window.addEventListener('load', scrollToTarget, { once: true });
      }
    } else {
      window.scrollTo(0, 0);
    }

    const saveScroll = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          saveScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      saveScroll();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
