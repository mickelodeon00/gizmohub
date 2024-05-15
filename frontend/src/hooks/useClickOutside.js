import { useEffect, useRef } from 'react';

const useClickOutside = (callbackfn) => {
  const domNodeRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!domNodeRef.current?.contains(event.target)) {
        callbackfn();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [callbackfn]);

  return domNodeRef;
};

export default useClickOutside;
