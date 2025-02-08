import { useEffect } from 'react';
import Frame, { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';
import getXPath from '@/utils/getXPath';

import { useDispatch } from '@/hooks/common/useCustomRedux';
import { useWebSocket } from '@/hooks/scenarioAct/useWebsocket';

import * as S from '@/components/scenarioAct/actSection/actSection.style';

import testHtml from './testHtml';

import { setSessionId } from '@/slices/scenarioActSlice';

interface IWebSocketMessage {
  sessionId?: string;
  html?: string;
  css?: string;
}

export default function ActSection() {
  const dispatch = useDispatch();
  console.log('on/off');
  const { isConnected, sendMessage } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, {
    onMessage: (message: string) => {
      try {
        const parsedMessage: IWebSocketMessage = JSON.parse(message);
        console.log('수신된 메시지:', parsedMessage);
        dispatch(setSessionId(parsedMessage.sessionId || null));
      } catch (error) {
        console.error('WebSocket 메시지 파싱 에러:', error);
      }
    },
    onOpen: () => {
      console.log('WebSocket 연결 성공');
    },
    onClose: () => {
      console.log('WebSocket 연결 종료');
      dispatch(setSessionId(null));
    },
    onError: (error) => {
      console.error('WebSocket 에러:', error);
    },
  });

  const style = {
    width: '100%',
    height: '100%',
    border: 'none',
    margin: '0px',
    padding: '0px',
  };
  const css = `<!DOCTYPE html>
    <html>
      <head>
        <style>${testHtml.css}
          .highlighted-element {
            outline: 3px solid #ffeb3b;
            background-color: rgba(255, 235, 59, 0.2);
          } 
        </style>
      </head>
      <body>
        <div id="mountHere"></div>
      </body>
    </html>
 `;
  return (
    <S.Container>
      <Frame style={style} initialContent={css} mountTarget="#mountHere">
        <InnerComponent htmlContent={testHtml.html} />
      </Frame>
    </S.Container>
  );
}

function InnerComponent({ htmlContent }: { htmlContent: string }) {
  const { document } = useFrame();

  useEffect(() => {
    if (!document) return;

    document.body.innerHTML = htmlContent;

    let lastHighlightedElement: HTMLElement | null = null;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const cssSelector = getCssSelector(target);
      const xPath = getXPath(target);

      console.log('=== Element Details ===');
      console.log(cssSelector);
      console.log(xPath);

      if (lastHighlightedElement) {
        lastHighlightedElement.classList.remove('highlighted-element');
      }

      target.classList.add('highlighted-element');
      lastHighlightedElement = target;
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      console.log('언마운트');
      //document.body.removeEventListener('click', handleClick);
    };
  }, [document, htmlContent]);

  return null;
}
