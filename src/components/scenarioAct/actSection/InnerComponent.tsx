import { memo, useEffect, useRef } from 'react';
import { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';
import getXPath from '@/utils/getXPath';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import { clickLocatorInput, setCurrentLocator } from '@/slices/scenarioActSlice';

const InnerComponent = memo(({ htmlContent, cssContent }: { htmlContent: string; cssContent: string }) => {
  const frame = useFrame();
  if (!frame) return null;

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

  //  클릭 이벤트 핸들러
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      event.stopPropagation();
    }

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

  //  모든 URL 이동 차단
  const blockNavigation = () => {
    if (typeof window === 'undefined') return;

    // window.open 차단
    window.open = () => {
      return null;
    };

    // window.onbeforeunload을 사용해 페이지 새로고침 차단
    window.onbeforeunload = (event) => {
      event.preventDefault();
      return '';
    };

    // 히스토리 변경 차단 (pushState, replaceState)
    const blockHistory = (method: 'pushState' | 'replaceState') => {
      const originalMethod = window.history[method];
      window.history[method] = function (...args) {
        return originalMethod.apply(window.history, args);
      };
    };

    blockHistory('pushState');
    blockHistory('replaceState');

    // 뒤로 가기
    window.addEventListener('popstate', (event) => {
      event.preventDefault();
    });
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

    //이벤트 리스너 등록
    document.body.addEventListener('click', handleClick, true);
    document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => event.preventDefault()));

    blockNavigation();

    return () => {
      if (!document) return;
      if (handleClick) {
        document.body.removeEventListener('click', handleClick, true);
      }
      document.querySelectorAll('form').forEach((form) => {
        if (form.parentNode) {
          form.replaceWith(form.cloneNode(true));
        }
      });
      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        styleTagRef.current = null;
      }
      if (mountHereRef.current && mountHereRef.current.parentNode) {
        while (mountHereRef.current.firstChild) {
          if (mountHereRef.current.contains(mountHereRef.current.firstChild)) {
            mountHereRef.current.removeChild(mountHereRef.current.firstChild);
          }
        }
      }
    };
  }, [htmlContent, cssContent]);

  return null;
});

export default InnerComponent;
