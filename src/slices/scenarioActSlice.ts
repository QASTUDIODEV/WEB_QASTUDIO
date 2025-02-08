import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IWebSocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  messages: string[];
}

interface IAction {
  actionId: number;
  actionDescription: string;
  step: number;
  actionType: string;
  locator: {
    strategy: string;
    value: string;
  };
  action: {
    type: string;
    value: string;
  };
}

interface IScenario {
  scenarioId: number;
  scenarioName: string;
  scenarioDescription: string;
  actions: IAction[];
  isOpen: boolean;
  lastActionId: number | null;
}

interface ICharacter {
  characterId: number;
  characterName: string;
}

interface IRecordAction {
  actionDescription: string;
  step: number;
  actionType: string;
  locator: {
    strategy: string;
    value: string;
  };
  action: {
    type: string;
    value: string;
  };
}

interface IScenarioActSlice {
  characterId: number | null;
  projectUrl: string | null;
  projectName: string | null;
  scenarios: IScenario[];
  characters: ICharacter[];
  recordActions: IRecordAction[];
  sessionId: string | null;
  webSocket: IWebSocketState;
}

interface ICharacterPayload {
  detailCharacters: { characterId: number; characterName: string }[];
}

interface IScenarioPayload {
  scenarios: [
    {
      scenarioId: number;
      scenarioName: string;
      scenarioDescription: string;
      actions: IAction[];
    },
  ];
}

// 초기 상태
const initialState: IScenarioActSlice = {
  characterId: null,
  projectUrl: 'https://www.kw.ac.kr/ko/',
  projectName: 'QASTUDIO',
  characters: [],
  scenarios: [],
  recordActions: [],
  sessionId: null,
  webSocket: {
    socket: null,
    isConnected: false,
    messages: [],
  },
};

const scenarioActSlice = createSlice({
  name: 'scenarioAct',
  initialState,
  reducers: {
    // 시나리오 선택
    openScenario: (state, action: PayloadAction<number>) => {
      state.scenarios.forEach((scenario) => {
        scenario.isOpen = scenario.scenarioId == action.payload ? !scenario.isOpen : false;
      });
    },
    // 프로젝트 정보 설정
    setProjectInfo: (state, action: PayloadAction<{ projectUrl: string | null; projectName: string | null }>) => {
      state.projectUrl = action.payload.projectUrl;
      state.projectName = action.payload.projectName;
    },
    // 역할 리스트 설정
    setCharacterList: (state, action: PayloadAction<ICharacterPayload>) => {
      state.characters = action.payload.detailCharacters.map(({ characterId, characterName }) => ({
        characterId,
        characterName,
      }));
    },
    // 선택된 캐릭터 ID 설정
    setCharacterId: (state, action: PayloadAction<number | null>) => {
      state.characterId = action.payload;
    },
    // 시나리오 리스트 설정
    setScenarioList: (state, action: PayloadAction<IScenarioPayload>) => {
      state.scenarios = action.payload.scenarios.map((scn) => ({
        ...scn,
        isOpen: false,
        lastActionId: null,
      }));
    },
    // action 추가
    addAction: (state, action: PayloadAction<IRecordAction>) => {
      state.recordActions.push(action.payload);
    },
    // action 삭제
    removeAction: (state, action: PayloadAction<number | undefined>) => {
      const deletedStep = action.payload;
      if (deletedStep === undefined) return;
      state.recordActions = state.recordActions.filter((itm) => itm.step !== deletedStep);
      // 재정렬
      state.recordActions = state.recordActions.map((itm) => (itm.step > deletedStep ? { ...itm, step: itm.step - 1 } : itm));
    },
    // 웹소켓 ID 설정
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
    // WebSocket 연결
    connectWebSocket: (state, action: PayloadAction<string>) => {
      if (!state.webSocket.socket) {
        const socket = new WebSocket(action.payload);

        socket.onopen = () => {
          console.log('WebSocket 연결 성공');
          state.webSocket.isConnected = true;
        };

        socket.onmessage = (event) => {
          console.log('수신된 메시지:', event.data);
          state.webSocket.messages.push(event.data);
        };

        socket.onerror = (error) => {
          console.error('WebSocket 에러 발생:', error);
        };

        socket.onclose = () => {
          console.log('WebSocket 연결 종료');
          state.webSocket.isConnected = false;
          state.webSocket.socket = null;
        };

        state.webSocket.socket = socket;
      }
    },
    // WebSocket 메시지 전송
    sendWebSocketMessage: (state, action: PayloadAction<string>) => {
      if (state.webSocket.socket && state.webSocket.isConnected) {
        state.webSocket.socket.send(action.payload);
      } else {
        console.error('WebSocket이 연결되지 않음');
      }
    },
    // WebSocket 연결 해제
    disconnectWebSocket: (state) => {
      if (state.webSocket.socket) {
        state.webSocket.socket.close();
        state.webSocket.socket = null;
        state.webSocket.isConnected = false;
      }
    },
  },
});

export const {
  openScenario,
  setProjectInfo,
  setCharacterList,
  setCharacterId,
  setScenarioList,
  addAction,
  removeAction,
  setSessionId,
  connectWebSocket,
  sendWebSocketMessage,
  disconnectWebSocket,
} = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
