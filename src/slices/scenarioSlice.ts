import { createSlice } from '@reduxjs/toolkit';

interface IScenario {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  isChecked: boolean;
}

interface ICharacter {
  id: number;
  title: string;
  isChecked: boolean;
  createdBy: string;
  createdAt: string;
  isExpanded: boolean;
  scenarios: IScenario[];
}

interface IScenarioSlice {
  isEdit: boolean;
  characters: ICharacter[];
}

const initialState: IScenarioSlice = {
  isEdit: false,
  characters: [
    {
      id: 1,
      title: '역할 1',
      isChecked: false,
      createdBy: 'User 1',
      createdAt: '8 hours ago',
      isExpanded: false,
      scenarios: [
        { id: 1, name: 'Scenario 1', createdBy: 'User 1', createdAt: 'a few seconds ago', isChecked: false },
        { id: 2, name: 'Scenario 2', createdBy: 'User 2', createdAt: 'a minute ago', isChecked: false },
      ],
    },
    {
      id: 2,
      title: '역할 2',
      isChecked: false,
      createdBy: 'User 3',
      createdAt: '18 hours ago',
      isExpanded: false,
      scenarios: [{ id: 3, name: 'Scenario 3', createdBy: 'User 3', createdAt: 'a few seconds ago', isChecked: false }],
    },
  ],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // 편집 상태
    edit: (state) => {
      state.isEdit = !state.isEdit;
    },
    // 전체 선택/선택해제
    toggleAll: (state) => {
      const allChecked: boolean = state.characters.every((character) => character.isChecked); //전체 체크 여부
      state.characters.forEach((character) => {
        character.isChecked = !allChecked;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = !allChecked;
        });
      });
    },
    // 역할 선택/선택해제
    toggleCharacter: (state, action) => {
      const character: ICharacter | undefined = state.characters.find((char) => char.id === action.payload);
      if (character) {
        const newCheckedStatus: boolean = !character.isChecked;
        character.isChecked = newCheckedStatus;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = newCheckedStatus;
        });
      }
    },
    // 시나리오 선택/선택해제
    toggleScenario: (state, action) => {
      const { characterId, scenarioId }: { characterId: number; scenarioId: number } = action.payload;
      const character: ICharacter | undefined = state.characters.find((char) => char.id === characterId);

      if (character) {
        const scenario: IScenario | undefined = character.scenarios.find((scn) => scn.id === scenarioId);
        if (scenario) {
          scenario.isChecked = !scenario.isChecked;

          const allScenariosChecked: boolean = character.scenarios.every((scn) => scn.isChecked); //전체 시나리오 선택 여부
          character.isChecked = allScenariosChecked;
        }
      }
    },
    // 확장 상태
    toggleExpand: (state, action) => {
      const character: ICharacter | undefined = state.characters.find((char) => char.id === action.payload);
      if (character) {
        character.isExpanded = !character.isExpanded;
      }
    },
    // 체크 리셋
    resetChecks: (state) => {
      state.characters.forEach((character) => {
        character.isChecked = false;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = false;
        });
      });
    },
  },
});

export const { edit, toggleAll, toggleCharacter, toggleScenario, toggleExpand, resetChecks } = characterSlice.actions;
export default characterSlice.reducer;
