import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ACTION_STATE } from '@/enums/enums';

interface IAction {
  actionId: number;
  name: string;
  locator: string;
  action: string;
  state: ACTION_STATE;
}

interface IScenario {
  scenarioId: number;
  name: string;
  isOpen: boolean;
  actions: IAction[];
}

interface IScenarioActSlice {
  characterId: number;
  title: string;
  scenarios: IScenario[];
}

// 초기 상태
const initialState: IScenarioActSlice = {
  characterId: 1,
  title: '역할 1',
  scenarios: [
    {
      scenarioId: 1,
      name: 'Scenario 1',
      isOpen: false,
      actions: [
        {
          actionId: 1,
          name: '액션1',
          locator: 'css_selector',
          action: 'testuser1@example.com',
          state: ACTION_STATE.ERROR,
        },
        {
          actionId: 2,
          name: '액션2',
          locator: 'css_selector',
          action: 'testuser2@example.com',
          state: ACTION_STATE.SUCCESS,
        },
      ],
    },
    {
      scenarioId: 2,
      name: 'Scenario 2',
      isOpen: false,
      actions: [
        {
          actionId: 3,
          name: '액션3',
          locator: 'css_selector',
          action: 'testuser3@example.com',
          state: ACTION_STATE.UNVERIFIED,
        },
      ],
    },
  ],
};

const scenarioActSlice = createSlice({
  name: 'scenarioAct',
  initialState,
  reducers: {
    // 시나리오 선택
    openScenario: (state, action: PayloadAction<number>) => {
      state.scenarios.forEach((scenario) => {
        if (scenario.scenarioId === action.payload) {
          // 이미 열려 있다면 닫음
          scenario.isOpen = !scenario.isOpen;
        } else {
          // 다른 시나리오 닫기
          scenario.isOpen = false;
        }
      });
    },
  },
});

export const { openScenario } = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
