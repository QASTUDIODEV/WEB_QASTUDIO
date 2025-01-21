import { createSlice } from '@reduxjs/toolkit';

interface ICharacter {
  id: number;
  title: string;
  isSelected: boolean;
  scenarios: IScenario[];
}

interface IScenario {
  id: number;
  name: string;
  isSelected: boolean;
  actions: IAction[];
}

interface IAction {
  id: number;
  name: string;
  locator: string;
  action: string;
}

interface IScenarioSlice {
  characters: ICharacter[];
}

const initialState: IScenarioSlice = {
  characters: [
    {
      id: 1,
      title: '역할 1',
      isSelected: false,
      scenarios: [
        { id: 1, name: 'Scenario 1', isSelected: false, actions: [{ id: 1, name: '액션1', locator: 'css_selector', action: 'testuser1@example.com' }] },
        { id: 2, name: 'Scenario 2', isSelected: false, actions: [{ id: 2, name: '액션2', locator: 'css_selector', action: 'testuser2@example.com' }] },
      ],
    },
  ],
};

const scenarioActSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // 편집 상태
    edit: (state) => {
      console.log('hi');
    },
  },
});

export const { edit } = scenarioActSlice.actions;
export default scenarioActSlice.reducer;
