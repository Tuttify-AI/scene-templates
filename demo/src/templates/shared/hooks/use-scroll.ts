import { useCallback, useEffect, useState } from 'react';
import { isInViewport } from '../utils';

export default function useScroll(element: HTMLElement | null) {
  const [isVisible, setVisible] = useState(false);
  const handleScroll = useCallback(() => {
    setVisible(isInViewport(element));
  }, [setVisible, element]);

  useEffect(() => {
    setVisible(isInViewport(element));
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setVisible, handleScroll, element]);

  return {
    isVisible,
  };
}
