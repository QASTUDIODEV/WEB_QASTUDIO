import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addWebSocketMessage, setSessionId, setWebSocketConnected, updateIframeContent } from '@/slices/scenarioActSlice';

const useWebSocket = (url: string, isActive: boolean) => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);

  // 이스케이프 문자 처리
  const decodeHtml = (escapedStr: string) => {
    return escapedStr.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\"/g, '"').replace(/\\\//g, '/');
  };

  useEffect(() => {
    if (!isActive || socketRef.current) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket 연결 성공:', url);
      dispatch(setWebSocketConnected(true));
    };

    socket.onmessage = async (event) => {
      console.log('수신된 메시지 (Raw):', event.data);

      try {
        let parsedMessage;
        if (event.data instanceof Blob) {
          console.log('Blob 데이터 감지');
          const text = await event.data.text();
          parsedMessage = JSON.parse(text);
        } else if (typeof event.data === 'string') {
          console.log('문자열 데이터 감지');
          parsedMessage = JSON.parse(event.data);
        } else {
          console.log('JSON 객체 감지');
          parsedMessage = event.data;
        }

        console.log('파싱된 메시지:', parsedMessage);

        if (parsedMessage.sessionId) {
          console.log(1);
          dispatch(setSessionId(parsedMessage.sessionId));
        } else if (parsedMessage.html && parsedMessage.css) {
          console.log('🎨 iframe 업데이트 실행');
          dispatch(
            updateIframeContent({
              html: decodeHtml(parsedMessage.html),
              css: decodeHtml(parsedMessage.css),
            }),
          );
        } else {
          dispatch(addWebSocketMessage(parsedMessage));
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error, '원본 메시지:', event.data);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 종료');
      dispatch(setWebSocketConnected(false));
      socketRef.current = null;
    };

    socket.onerror = (error) => {
      console.error('WebSocket 에러 발생:', error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, dispatch, isActive]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error('WebSocket이 연결되지 않음');
    }
  };

  return { sendMessage };
};

export default useWebSocket;
