import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import { addWebSocketMessage, setActionState, setLastActionId, setSessionId, setWebSocketConnected, updateIframeContent } from '@/slices/scenarioActSlice';

const useWebSocket = (url: string) => {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);
  const isConnected = useSelector((state) => state.scenarioAct.webSocket.isConnected);
  // 이스케이프 문자 처리
  const decodeHtml = (escapedStr: string) => {
    return escapedStr.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\"/g, '"').replace(/\\\//g, '/');
  };

  useEffect(() => {
    if (socketRef.current || !isConnected) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket 연결 성공:', url);
    };

    socket.onmessage = async (event) => {
      console.log('수신 메시지:', event.data);

      try {
        let parsedMessage;
        if (event.data instanceof Blob) {
          const text = await event.data.text();
          parsedMessage = JSON.parse(text);
        } else if (typeof event.data === 'string') {
          parsedMessage = JSON.parse(event.data);
        } else {
          parsedMessage = event.data;
        }

        console.log('파싱된 메시지:', parsedMessage);

        if (parsedMessage.sessionId) {
          // 세션id
          dispatch(setSessionId(parsedMessage.sessionId));
        } else if (parsedMessage.html && parsedMessage.css) {
          // 실행 성공
          if (parsedMessage.phase === 'AFTER_ACTION') {
            dispatch(setLastActionId(parsedMessage.actionId));
            dispatch(setActionState({ actionId: parsedMessage.actionId, state: parsedMessage.status }));
          }
          dispatch(
            updateIframeContent({
              html: decodeHtml(parsedMessage.html),
              css: decodeHtml(parsedMessage.css),
            }),
          );
        } else if (parsedMessage.error) {
          // 실행 실패
          if (parsedMessage.phase === 'AFTER_ACTION') {
            dispatch(setLastActionId(parsedMessage.actionId));
            dispatch(setActionState({ actionId: parsedMessage.actionId, state: parsedMessage.status }));
          }
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
  }, [url, dispatch, isConnected]);

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
