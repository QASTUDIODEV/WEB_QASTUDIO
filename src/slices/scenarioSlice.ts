import { createSlice } from '@reduxjs/toolkit';

interface IScenario {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  isChecked: boolean;
  isSelected: boolean;
}

interface ICharacter {
  id: number;
  title: string;
  isChecked: boolean;
  isSelected: boolean;
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
      isSelected: false,
      createdBy: 'User 1',
      createdAt: '8 hours ago',
      isExpanded: false,
      scenarios: [
        { id: 1, name: 'Scenario 1', createdBy: 'User 1', createdAt: 'a few seconds ago', isChecked: false, isSelected: false },
        { id: 2, name: 'Scenario 2', createdBy: 'User 2', createdAt: 'a minute ago', isChecked: false, isSelected: false },
      ],
    },
    {
      id: 2,
      title: '역할 2',
      isChecked: false,
      isSelected: false,
      createdBy: 'User 3',
      createdAt: '18 hours ago',
      isExpanded: false,
      scenarios: [{ id: 3, name: 'Scenario 3', createdBy: 'User 3', createdAt: 'a few seconds ago', isChecked: false, isSelected: false }],
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
    // 전체 체크/체크해제
    toggleAll: (state) => {
      const allChecked: boolean = state.characters.every((character) => character.isChecked); //전체 체크 여부
      state.characters.forEach((character) => {
        character.isChecked = !allChecked;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = !allChecked;
        });
      });
    },
    // 역할 체크/체크해제
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
    // 시나리오 체크/체크해제
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
    // 선택
    selectEntity: (state, action) => {
      const { characterId, scenarioId = null }: { characterId: number | null; scenarioId: number | null } = action.payload;

      // 모든 캐릭터와 시나리오의 isSelected를 초기화
      state.characters.forEach((character) => {
        character.isSelected = false; // 캐릭터 선택 초기화
        character.scenarios.forEach((scenario) => {
          scenario.isSelected = false; // 시나리오 선택 초기화
        });
      });

      // 캐릭터 선택
      if (characterId !== null && scenarioId === null) {
        const character = state.characters.find((char) => char.id === characterId);
        if (character) {
          character.isSelected = true;
        }
      }

      // 시나리오 선택
      if (scenarioId !== null) {
        state.characters.forEach((character) => {
          const scenario = character.scenarios.find((scn) => scn.id === scenarioId);
          if (scenario) {
            scenario.isSelected = true;
          }
        });
      }
    },
  },
});

export const { edit, toggleAll, toggleCharacter, toggleScenario, toggleExpand, resetChecks, selectEntity } = characterSlice.actions;
export default characterSlice.reducer;
