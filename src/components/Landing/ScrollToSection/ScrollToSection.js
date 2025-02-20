import { useEffect } from 'react';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';

// ScrollToSection enables smooth scrolling to page sections when clicking navigation menu links,
// considering an additional offset to compensate for a fixed navbar at the top.

export const ScrollToSection = () => {
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget?.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - navHeight.desktop;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);
  return null;
};
