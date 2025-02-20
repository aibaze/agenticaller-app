import { useEffect } from 'react';

// if user clicks outside Ref or press ESC key, trigger callback
const useClickOutsideAndEscape = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, callback]);
};

export default useClickOutsideAndEscape;
