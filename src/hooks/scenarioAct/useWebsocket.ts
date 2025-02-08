import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addWebSocketMessage, setSessionId, setWebSocketConnected, updateIframeContent } from '@/slices/scenarioActSlice';

const useWebSocket = (url: string, isActive: boolean) => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isActive || socketRef.current) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket 연결 성공:', url);
      dispatch(setWebSocketConnected(true));
    };

    socket.onmessage = (event) => {
      console.log('수신된 메시지:', event.data);

      try {
        const parsedMessage = JSON.parse(event.data);

        if (parsedMessage.sessionId) {
          dispatch(setSessionId(parsedMessage.sessionId));
        } else if (parsedMessage.html && parsedMessage.css) {
          dispatch(updateIframeContent({ html: parsedMessage.html, css: parsedMessage.css }));
        } else {
          dispatch(addWebSocketMessage(event.data));
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error);
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
