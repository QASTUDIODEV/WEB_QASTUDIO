import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ACTION_STATE, ACTION_TYPE } from '@/enums/enums';

interface IAction {
  actionId: number;
  name: string;
  actionType: ACTION_TYPE;
  state: ACTION_STATE;
  locator: string;
  action: string;
}

interface IScenario {
  scenarioId: number;
  name: string;
  isOpen: boolean;
  lastActionId: number | null;
  actions: IAction[];
}

interface ICharacter {
  characterId: number;
  characterName: string;
}

interface IScenarioActSlice {
  characterId: number | null;
  projectUrl: string | null;
  projectName: string | null;
  scenarios: IScenario[];
  characters: ICharacter[];
}

interface ICharacterPayload {
  detailCharacters: { characterId: number; characterName: string }[];
}
interface IScenarioPayload {
  scenarioList: { scenarioId: number; scenarioName: string }[];
}
// 초기 상태
const initialState: IScenarioActSlice = {
  characterId: null,
  projectUrl: 'https://www.kw.ac.kr/ko/',
  projectName: 'QASTUDIO',
  characters: [],
  scenarios: [],
};

const scenarioActSlice = createSlice({
  name: 'scenarioAct',
  initialState,
  reducers: {
    // 시나리오 선택
    openScenario: (state, action: PayloadAction<number>) => {
      state.scenarios.forEach((scenario) => {
        scenario.isOpen = scenario.scenarioId === action.payload ? !scenario.isOpen : false;
      });
    },
    //  프로젝트 정보 설정
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
      state.scenarios = action.payload.scenarioList.map(({ scenarioId, scenarioName }) => ({
        scenarioId,
        name: scenarioName,
        isOpen: false,
        lastActionId: null,
        actions: [],
      }));
    },
  },
});

export const { openScenario, setProjectInfo, setCharacterList, setCharacterId, setScenarioList } = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
