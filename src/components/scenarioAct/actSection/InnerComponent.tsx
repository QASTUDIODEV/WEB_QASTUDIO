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

  //클릭
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (lastHighlightedElement.current) {
      lastHighlightedElement.current.classList.remove('qa-highlighted-element');
    }
    target.classList.add('qa-highlighted-element');
    lastHighlightedElement.current = target;

    const id = target.id || '';
    const cssSelector = getCssSelector(target);
    const xPath = getXPath(target);

    console.log('=== Element Details ===', { id, cssSelector, xPath, latestLocator });

    if (!latestLocator.current.isInputFocused || latestLocator.current.actionId === null) return;

    dispatch(setCurrentLocator({ actionId: latestLocator.current.actionId, id, cssSelector, xPath }));
    dispatch(clickLocatorInput(true));
  };
  // 링크 차단
  const disableLinks = (event: MouseEvent) => {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault();
      handleClick(event);
    }
  };

  useEffect(() => {
    if (!document) return;

    mountHereRef.current = document.getElementById('mountHere') as HTMLDivElement;
    if (mountHereRef.current) {
      while (mountHereRef.current.firstChild) {
        mountHereRef.current.removeChild(mountHereRef.current.firstChild);
      }
      mountHereRef.current.innerHTML = htmlContent;
    }

    if (styleTagRef.current?.parentNode) {
      styleTagRef.current.parentNode.removeChild(styleTagRef.current);
      styleTagRef.current = null;
    }
    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssContent;
    document.head.appendChild(styleTag);
    styleTagRef.current = styleTag;

    document.body.addEventListener('click', handleClick);
    document.querySelectorAll('a').forEach((link) => link.addEventListener('click', disableLinks));

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.querySelectorAll('a').forEach((link) => link.removeEventListener('click', disableLinks));

      if (styleTagRef.current?.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        styleTagRef.current = null;
      }

      if (mountHereRef.current) {
        while (mountHereRef.current.firstChild) {
          mountHereRef.current.removeChild(mountHereRef.current.firstChild);
        }
      }
    };
  }, [htmlContent, cssContent]);

  return null;
});

export default InnerComponent;
