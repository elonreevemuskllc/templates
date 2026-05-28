import { useEffect } from 'react';
import haptics from '../utils/haptics';

// Déclenche un haptic léger chaque fois qu'un élément marqué
// data-haptic="true" entre dans le viewport pendant le scroll
const useScrollHaptics = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            haptics.light();
          }
        });
      },
      { threshold: 0.2 }
    );

    // On observe après un court délai pour ne pas déclencher au chargement initial
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-haptic]').forEach(el => observer.observe(el));
    }, 800);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
};

export default useScrollHaptics;
