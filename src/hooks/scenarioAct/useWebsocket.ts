import { useCallback, useEffect, useRef, useState } from 'react';

interface IWebSocketValues {
  onOpen?: () => void;
  onMessage?: (message: string) => void;
  onError?: (error: Event) => void;
  onClose?: (event: CloseEvent) => void;
}

interface IUseWebSocketReturn {
  isConnected: boolean;
  sendMessage: (message: string) => void;
  closeSocket: () => void;
}

export const useWebSocket = (url: string, options?: IWebSocketValues): IUseWebSocketReturn => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // 메시지 보내기
  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error('WebSocket이 열려 있지 않습니다.');
    }
  }, []);

  // WebSocket 닫기
  const closeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  }, []);

  useEffect(() => {
    // WebSocket 연결 생성
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // 연결 성공 시
    socket.onopen = () => {
      console.log('WebSocket 연결 성공');
      setIsConnected(true);
      options?.onOpen?.();
    };

    // 메시지 수신 시
    socket.onmessage = (event) => {
      console.log('수신된 메시지:', event.data);
      options?.onMessage?.(event.data);
    };

    // 에러 발생 시
    socket.onerror = (error) => {
      console.error('WebSocket 에러 발생:', error);
      options?.onError?.(error);
    };

    // 연결 종료 시
    socket.onclose = (event) => {
      console.log('WebSocket 연결 종료');
      setIsConnected(false);
      options?.onClose?.(event);
    };

    // 컴포넌트 언마운트 시 WebSocket 닫기
    return () => {
      socket.close();
    };
  }, []);

  return { isConnected, sendMessage, closeSocket };
};
