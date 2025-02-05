import { useEffect, useState } from 'react';
import Frame, { useFrame } from 'react-frame-component';

import getCssSelector from '@/utils/getCssSelector';

import { useWebSocket } from '@/hooks/scenarioAct/useWebsocket';

import * as S from '@/components/scenarioAct/actSection/actSection.style';

export default function ActSection() {
  // WebSocket
  const [socketId, setSocketId] = useState<string | null>(null);
  const { isConnected, sendMessage } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL, {
    onMessage: (message) => {
      console.log('수신된 메시지:', message);
      setSocketId(message);
    },
    onOpen: () => {
      console.log('WebSocket 연결 성공');
    },
    onClose: () => {
      console.log('WebSocket 연결 종료');
    },
    onError: (error) => {
      console.error('WebSocket 에러:', error);
    },
  });

  //  HTML
  const htmlContent: string = `
    <div>
            <h1>Example Domain</h1>
            <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>
            <p>
<a href="https://www.iana.org/domains/example">More information...</a>
</p>
        </div>
  `;

  const initialContent: string = `<!DOCTYPE html><html><head><style>
  body {
        background-color: #f0f0f2;

        margin: 0;

        padding: 0;

        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

        
    }
    div {
        width: 600px;

        margin: 5em auto;

        padding: 2em;

        background-color: #fdfdff;

        border-radius: 0.5em;

        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);

    }
    a:link, a:visited {
        color: #38488f;

        text-decoration: none;

    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;

            width: auto;

        }
    }
</style></head><body><div id="mountHere"></div></body></html>`;

  return (
    <S.Container>
      <Frame
        style={{
          width: '100%',
          height: '100%',
        }}
        initialContent={initialContent}
        mountTarget="#mountHere"
      >
        <InnerComponent htmlContent={htmlContent} />
      </Frame>
    </S.Container>
  );
}

function InnerComponent({ htmlContent }: any) {
  const { document } = useFrame();

  useEffect(() => {
    if (document) {
      document.body.innerHTML = htmlContent;

      // 클릭 이벤트 리스너 추가
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target) {
          console.log('=== Element Details ===');
          console.log(`Tag: ${target.tagName}`);
          console.log(`ID: ${target.id ? `#${target.id}` : '(none)'}`);
          console.log(`Class: ${target.className ? `.${target.className.split(' ').join('.')}` : '(none)'}`);
          console.log(`CSS Selector: ${getCssSelector(target)}`);
          console.log(`Inner HTML: ${target.innerHTML}`);
        }
      };

      // body에 이벤트 리스너 추가
      document.body.addEventListener('click', handleClick);

      return () => {
        document.body.removeEventListener('click', handleClick);
      };
    }
  }, [document, htmlContent]);

  return null;
}
