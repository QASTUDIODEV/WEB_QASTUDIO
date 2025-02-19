import { memo, useEffect, useRef } from 'react';
import { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';
import getXPath from '@/utils/getXPath';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import { clickLocatorInput, setCurrentLocator } from '@/slices/scenarioActSlice';

const InnerComponent = memo(({ htmlContent, cssContent }: { htmlContent: string; cssContent: string }) => {
  const frame = useFrame();
  if (!frame?.document || !frame?.window) return null;

  const { document, window } = frame;
  const dispatch = useDispatch();
  const mountHereRef = useRef<HTMLDivElement | null>(null);
  const styleTagRef = useRef<HTMLStyleElement | null>(null);
  const lastHighlightedElement = useRef<HTMLElement | null>(null);

  const currentLocator = useSelector((state) => state.scenarioAct.currentLocator);
  const latestLocator = useRef(currentLocator);

  useEffect(() => {
    latestLocator.current = currentLocator;
  }, [currentLocator]);

  // 클릭 이벤트 핸들러
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (lastHighlightedElement.current) {
      lastHighlightedElement.current.classList.remove('qa-highlighted-element');
    }

    const id = target.id || '';
    const cssSelector = getCssSelector(target);
    const xPath = getXPath(target);

    console.log('=== Element Details ===', { id, cssSelector, xPath, latestLocator });

    if (!latestLocator.current.isInputFocused || latestLocator.current.actionId === null) return;

    dispatch(setCurrentLocator({ actionId: latestLocator.current.actionId, id, cssSelector, xPath }));
    dispatch(clickLocatorInput(true));

    target.classList.add('qa-highlighted-element');
    lastHighlightedElement.current = target;
  };

  // <a> 태그 클릭 차단
  const handleLinkClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      console.warn('Blocked link click:', (target as HTMLAnchorElement).href);
    }
  };

  // URL 이동 차단
  const blockNavigation = () => {
    window.open = () => null;
    window.onbeforeunload = (event) => {
      event.preventDefault();
      return '';
    };

    const blockHistory = (method: 'pushState' | 'replaceState') => {
      const originalMethod = window.history[method];
      window.history[method] = (...args: Parameters<History['pushState']>) => {
        console.warn(`Navigation blocked: ${method}`);
        return originalMethod.apply(window.history, args);
      };
    };
    blockHistory('pushState');
    blockHistory('replaceState');

    window.addEventListener('popstate', (event) => event.preventDefault());
  };

  useEffect(() => {
    if (!document) return;

    // HTML 적용
    mountHereRef.current = document.getElementById('mountHere') as HTMLDivElement;
    if (mountHereRef.current) {
      mountHereRef.current.replaceChildren();
      mountHereRef.current.innerHTML = htmlContent;
    }

    // CSS 적용
    if (!styleTagRef.current) {
      const styleTag = document.createElement('style');
      document.head.appendChild(styleTag);
      styleTagRef.current = styleTag;
    }
    styleTagRef.current.innerHTML = cssContent;

    // 이벤트 리스너 등록
    document.addEventListener('click', handleClick, true);
    document.addEventListener('click', handleLinkClick, true);
    document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => event.preventDefault()));

    blockNavigation();

    return () => {
      if (!document) return;

      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('click', handleLinkClick, true);
      document.querySelectorAll('form').forEach((form) => {
        if (form.parentNode) {
          form.replaceWith(form.cloneNode(true) as HTMLFormElement);
        }
      });

      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        styleTagRef.current = null;
      }

      if (mountHereRef.current) {
        mountHereRef.current.replaceChildren();
      }
    };
  }, [htmlContent, cssContent]);

  return null;
});

export default InnerComponent;
