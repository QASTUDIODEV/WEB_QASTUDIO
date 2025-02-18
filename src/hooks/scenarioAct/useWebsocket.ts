import { useEffect, useRef } from 'react';

import { ACTION_STATE } from '@/enums/enums';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import { setActionState, setLastActionId, setRunningScenario, setSessionId, setWebSocketConnected, updateIframeContent } from '@/slices/scenarioActSlice';

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

        console.log('수신된 메시지:', parsedMessage);

        if (parsedMessage.sessionId) {
          // 세션id
          dispatch(setSessionId(parsedMessage.sessionId));
        } else if (parsedMessage.html && parsedMessage.css) {
          // 실행 성공
          if (parsedMessage.phase === 'AFTER_ACTION') {
            dispatch(setLastActionId(parsedMessage.actionId));
            dispatch(setActionState({ actionId: parsedMessage.actionId, state: parsedMessage.status }));
          }
          if (parsedMessage.phase === 'BEFORE_ACTION') {
            dispatch(setActionState({ actionId: parsedMessage.actionId, state: ACTION_STATE.IN_PROGRESS }));
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 종료');
      dispatch(setWebSocketConnected(false));
      dispatch(setRunningScenario(null));

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

  return;
};

export default useWebSocket;
