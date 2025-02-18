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

interface IStep {
  step: number;
  selectedScenarioId: number | null;
}

interface IScenarioActSlice {
  characterId: number | null;
  projectUrl: string | null;
  projectName: string | null;
  scenarios: IScenario[];
  characters: ICharacter[];
  recordActions: IRecordAction[];
  editRecordActions: IRecordAction[];
  currentTestId: number;
  currentHtml: string;
  currentCss: string;
  webSocket: IWebSocketState;
  currentLocator: ICurrentLocator;
  step: IStep;
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
  projectUrl: null,
  projectName: null,
  characters: [],
  scenarios: [],
  recordActions: [],
  editRecordActions: [],
  currentTestId: 0,
  currentHtml: `<div> </div>`,
  currentCss: `<!DOCTYPE html>
<html>
<head>
      <style >
      </style>
    </head>
<body>
  <div id="mountHere"></div>
</body>
</html>`,
  webSocket: {
    runningScenarioId: null,
    isConnected: false,
    sessionId: null,
    lastActionId: null,
  },
  currentLocator: { actionId: null, id: null, xPath: null, cssSelector: null, isInputFocused: false, isClicked: false },
  step: { step: 1, selectedScenarioId: null },
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

    // 시나리오 추가 record
    fetchAction: (state, action: PayloadAction<IRecordAction[]>) => {
      state.recordActions = action.payload;
    },
    addAction: (state, action: PayloadAction<IRecordAction>) => {
      state.recordActions.push(action.payload);
    },
    removeAction: (state, action: PayloadAction<number | undefined>) => {
      const deletedStep = action.payload;
      if (deletedStep === undefined) return;
      state.recordActions = state.recordActions.filter((itm) => itm.step !== deletedStep);
      state.recordActions = state.recordActions.map((itm) => (itm.step > deletedStep ? { ...itm, step: itm.step - 1 } : itm));
    },

    // 시나리오 편집 record
    fetchEditAction: (state, action: PayloadAction<IRecordAction[]>) => {
      state.editRecordActions = action.payload;
    },
    addEditAction: (state, action: PayloadAction<IRecordAction>) => {
      state.editRecordActions.push(action.payload);
    },
    removeEditAction: (state, action: PayloadAction<number | undefined>) => {
      const deletedStep = action.payload;
      if (deletedStep === undefined) return;
      state.editRecordActions = state.editRecordActions.filter((itm) => itm.step !== deletedStep);
      // 재정렬
      state.editRecordActions = state.editRecordActions.map((itm) => (itm.step > deletedStep ? { ...itm, step: itm.step - 1 } : itm));
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
      state.currentHtml = action.payload.html;
      state.currentCss =
        action.payload.css +
        `.qa-highlighted-element {
      background: rgba(13, 64, 157, 0.2);
      mix-blend-mode: multiply; 
      border: 1px dashed #0D409D;
      border-radius:4px;
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
      state.currentTestId = action.payload;
    },

    // 컨트롤러 스탭
    setStep: (state, action: PayloadAction<number>) => {
      state.step.step = action.payload;
    },
    setScenarioId: (state, action: PayloadAction<number | null>) => {
      state.step.selectedScenarioId = action.payload;
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
  setStep,
  setScenarioId,
  fetchEditAction,
  addEditAction,
  removeEditAction,
  fetchAction,
} = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
