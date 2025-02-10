import { useEffect, useRef } from 'react';
import Frame, { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';
import getXPath from '@/utils/getXPath';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import * as S from '@/components/scenarioAct/actSection/actSection.style';

import { setCurrentLocator } from '@/slices/scenarioActSlice';

export default function ActSection() {
  const currentHtml = useSelector((state) => state.scenarioAct.currentHtml);
  const currentCss = useSelector((state) => state.scenarioAct.currentCss);

  const style = {
    width: '100%',
    height: '100%',
    border: 'none',
    margin: '0px',
    padding: '0px',
  };

  return (
    <S.Container>
      <Frame style={style} initialContent="<html><head><style></style></head><body><div id='mountHere'></div></body></html>" mountTarget="#mountHere">
        <InnerComponent htmlContent={currentHtml} cssContent={currentCss} />
      </Frame>
    </S.Container>
  );
}

function InnerComponent({ htmlContent, cssContent }: { htmlContent: string; cssContent: string }) {
  const { document } = useFrame();
  const dispatch = useDispatch();
  const lastHighlightedElement = useRef<HTMLElement | null>(null);
  const styleTagRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!document) return;

    const mountHere = document.getElementById('mountHere');
    if (mountHere) {
      mountHere.innerHTML = htmlContent;
    }

    // 기존 스타일 제거 후 새로운 CSS 적용
    try {
      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
      }
    } catch (error) {
      console.warn('⚠ `removeChild` 실행 중 노드가 존재하지 않음:', error);
    }

    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssContent;
    document.head.appendChild(styleTag);
    styleTagRef.current = styleTag; // styleTagRef 업데이트

    // ✅ 클릭 이벤트 핸들러
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const id = target.id || '';
      const cssSelector = getCssSelector(target);
      const xPath = getXPath(target);

      console.log('=== Element Details ===');
      console.log('css: ', cssSelector);
      console.log('xPath: ', xPath);
      dispatch(setCurrentLocator({ id, cssSelector, xPath }));

      if (lastHighlightedElement.current) {
        lastHighlightedElement.current.classList.remove('highlighted-element');
      }

      target.classList.add('highlighted-element');
      lastHighlightedElement.current = target;
    };

    document.body.addEventListener('click', handleClick);

    // ✅ 링크 클릭 차단
    const disableLinks = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName.toLowerCase() === 'a') {
        event.preventDefault();
        handleClick(event);
      }
    };

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', disableLinks);
    });

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.querySelectorAll('a').forEach((link) => {
        link.removeEventListener('click', disableLinks);
      });

      // ✅ 기존 스타일 제거 (부모 노드가 있는 경우에만)
      try {
        if (styleTagRef.current && styleTagRef.current.parentNode) {
          styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        }
      } catch (error) {
        console.warn('⚠ Cleanup에서 `removeChild` 실행 중 노드가 존재하지 않음:', error);
      }
    };
  }, [document, htmlContent, cssContent]); // ✅ 상태 변경 시 useEffect 실행

  return null;
}
