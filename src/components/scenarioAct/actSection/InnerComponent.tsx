import { memo, useEffect, useRef } from 'react';
import { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';
import getXPath from '@/utils/getXPath';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import { clickLocatorInput, setCurrentLocator } from '@/slices/scenarioActSlice';

const InnerComponent = memo(({ htmlContent, cssContent }: { htmlContent: string; cssContent: string }) => {
  const { document } = useFrame();
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
  const handleEvent = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.type !== 'click') return;

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
    const eventTypes: (keyof DocumentEventMap)[] = ['click', 'mousedown', 'mouseup', 'keydown'];
    eventTypes.forEach((event) => document.addEventListener(event, handleEvent, true));

    return () => {
      // 이벤트 리스너 제거
      eventTypes.forEach((event) => document.removeEventListener(event, handleEvent, true));

      // 스타일 태그 제거
      if (styleTagRef.current?.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        styleTagRef.current = null;
      }

      // HTML 클리어
      if (mountHereRef.current) {
        mountHereRef.current.replaceChildren();
      }
    };
  }, [htmlContent, cssContent]);

  return null;
});

export default InnerComponent;
