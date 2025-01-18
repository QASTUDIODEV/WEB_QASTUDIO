import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(id: string) {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let currentElem = document.getElementById(id);

    if (!currentElem) {
      const newElem = document.createElement('div');
      newElem.setAttribute('id', id);
      document.body.appendChild(newElem);
      rootElemRef.current = newElem;
    } else {
      rootElemRef.current = currentElem as HTMLDivElement;
    }

    return () => {
      if (rootElemRef.current && !document.getElementById(id)) {
        document.body.removeChild(rootElemRef.current);
      }
    };
  }, [id]);

  return (children: ReactNode) => {
    if (!rootElemRef.current) return null;
    return createPortal(children, rootElemRef.current);
  };
}
