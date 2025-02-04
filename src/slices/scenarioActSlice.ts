import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

//import type { ACTION_STATE, ACTION_TYPE } from '@/enums/enums';

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
    //  선택된 캐릭터 ID 설정
    setCharacterId: (state, action: PayloadAction<number | null>) => {
      state.characterId = action.payload;
    },
    //  시나리오 리스트 설정
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
    removeAction: (state, action: PayloadAction<number>) => {
      state.recordActions = state.recordActions.filter((itm) => itm.step !== action.payload);
    },
  },
});

export const { openScenario, setProjectInfo, setCharacterList, setCharacterId, setScenarioList, addAction, removeAction } = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
