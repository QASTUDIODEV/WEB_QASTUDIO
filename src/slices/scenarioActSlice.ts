import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ACTION_STATE } from '@/enums/enums';

interface IWebSocketState {
  runningScenarioId: number | null;
  isConnected: boolean;
  sessionId: string | null;
  lastActionId: number | null;
}

interface IAction {
  actionId: number;
  actionDescription: string;
  step: number;
  actionType: string;
  state: ACTION_STATE;
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
interface ICurrentLocator {
  actionId: number | string | null;
  id: string | null;
  xPath: string | null;
  cssSelector: string | null;
  isInputFocused: boolean;
  isClicked: boolean;
}

interface IScenarioActSlice {
  characterId: number | null;
  projectUrl: string | null;
  projectName: string | null;
  scenarios: IScenario[];
  characters: ICharacter[];
  recordActions: IRecordAction[];
  currentTestId: number;
  webSocket: IWebSocketState;
  currentHtml: string;
  currentCss: string;
  currentLocator: ICurrentLocator;
}

/*---  payload --- */
interface ICharacterPayload {
  detailCharacters: { characterId: number; characterName: string }[];
}
interface IActionsPayload {
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

interface IScenarioPayload {
  scenarios: [
    {
      scenarioId: number;
      scenarioName: string;
      scenarioDescription: string;
      actions: IActionsPayload[];
    },
  ];
}
interface IActionPayload {
  actionId: number;
  state: ACTION_STATE;
}

// 초기 상태
const initialState: IScenarioActSlice = {
  characterId: null,
  projectUrl: 'https://www.kw.ac.kr/ko/',
  projectName: 'QASTUDIO',
  characters: [],
  scenarios: [],
  recordActions: [],
  currentTestId: 0,
  webSocket: {
    runningScenarioId: null,
    isConnected: false,
    sessionId: null,
    lastActionId: null,
  },
  currentHtml: `<div >
  <h1 >Example Domain</h1>
  <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>
  <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>`,
  currentCss: `<!DOCTYPE html>
<html>
<head>
      <style >
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
        .qa-highlighted-element {
          outline: 3px solid #ffeb3b;
          background-color: rgba(255, 235, 59, 0.2);
        }
        @media (max-width: 700px) {
          div {
            margin: 0 auto;
            width: auto;
          }
        }
          
      </style>
    </head>
<body>
  <div id="mountHere"></div>
</body>
</html>`,
  currentLocator: { actionId: null, id: null, xPath: null, cssSelector: null, isInputFocused: false, isClicked: false },
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
        actions: scn.actions.map((act) => ({
          ...act,
          state: ACTION_STATE.UNVERIFIED, // state: null
        })),
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

    // 클릭 시 로케이터 설정
    focusLocatorInput: (state, action: PayloadAction<number | string>) => {
      state.currentLocator.actionId = action.payload;
      state.currentLocator.isInputFocused = true;
    },
    blurLocatorInput: (state) => {
      state.currentLocator.isInputFocused = false;
    },
    clickLocatorInput: (state, action: PayloadAction<boolean>) => {
      state.currentLocator.isClicked = action.payload;
    },
    setCurrentLocator: (state, action: PayloadAction<{ actionId: number | string | null; id: string; cssSelector: string; xPath: string }>) => {
      if (state.currentLocator.isInputFocused && state.currentLocator.actionId === action.payload.actionId) {
        state.currentLocator.id = action.payload.id;
        state.currentLocator.cssSelector = action.payload.cssSelector;
        state.currentLocator.xPath = action.payload.xPath;
        state.currentLocator.isInputFocused = false; // 선택 후 자동 해제
      }
    },

    //웹 소켓
    setWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.webSocket.isConnected = action.payload;
    },

    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.webSocket.sessionId = action.payload;
    },
    updateIframeContent: (state, action: PayloadAction<{ html: string; css: string }>) => {
      console.log(action.payload.html);
      console.log(action.payload.css);
      state.currentHtml = action.payload.html;
      state.currentCss =
        action.payload.css +
        `.qa-highlighted-element {
          outline: 3px solid #ffeb3b;
          background-color: rgba(255, 235, 59, 0.2);
        }`;
    },
    // 실행중인 시나리오 설정
    setRunningScenario: (state, action: PayloadAction<number | null>) => {
      state.webSocket.runningScenarioId = action.payload;
    },
    // 가장최근 실행된 액션
    setLastActionId: (state, action: PayloadAction<number | null>) => {
      state.webSocket.lastActionId = action.payload;
    },
    // 액션상태
    setActionState: (state, action: PayloadAction<IActionPayload>) => {
      const scenarioIndex = state.scenarios.findIndex((scn) => scn.scenarioId === state.webSocket.runningScenarioId);
      if (scenarioIndex === -1) return;
      const actionIndex = state.scenarios[scenarioIndex].actions.findIndex((act) => act.actionId === action.payload.actionId);
      if (actionIndex === -1) return;
      state.scenarios[scenarioIndex].actions[actionIndex] = {
        ...state.scenarios[scenarioIndex].actions[actionIndex],
        state: action.payload.state,
      };
    },
    setCurrentTestId: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.currentTestId = action.payload;
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
  setWebSocketConnected,
  setSessionId,
  updateIframeContent,
  focusLocatorInput,
  blurLocatorInput,
  setCurrentLocator,
  setRunningScenario,
  clickLocatorInput,
  setLastActionId,
  setActionState,
  setCurrentTestId,
} = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
