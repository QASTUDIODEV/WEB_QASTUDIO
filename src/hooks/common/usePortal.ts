import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(id: string) {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentElem = rootElemRef.current;
    if (!currentElem) {
      const newElem = document.createElement('div');
      newElem.setAttribute('id', id);
      document.body.appendChild(newElem);
      rootElemRef.current = newElem;
    }
    return () => {
      if (currentElem) {
        document.body.removeChild(currentElem);
      }
    };
  }, [id]);

  return (children: ReactNode) => {
    if (!rootElemRef.current) return null;
    return createPortal(children, rootElemRef.current);
  };
}
