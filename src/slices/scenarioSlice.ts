import { createSlice } from '@reduxjs/toolkit';

interface IScenario {
  scenarioId: number;
  scenarioName: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  isChecked: boolean;
  isSelected: boolean;
}

interface IScenarioList {
  scenarioList: IScenario[];
}

interface ICharacter {
  id: number;
  isChecked: boolean;
  scenarios: IScenarioList;
}

interface IScenarioSlice {
  isEdit: boolean;
  characters: ICharacter[];
}

const initialState: IScenarioSlice = {
  isEdit: false,
  characters: [],
};

const scenarioReducer = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    newCharacter: (state, action) => {
      state.characters = [...state.characters, action.payload];
    },
    deleteAllCharacter: (state) => {
      state.characters = [];
    },
    edit: (state, action) => {
      state.isEdit = action.payload;
    },
    toggleAll: (state) => {
      const allChecked: boolean = state.characters.every((character) => character.isChecked); // 전체 체크 여부
      state.characters.forEach((character) => {
        character.isChecked = !allChecked;
        // scenarios가 배열일 때만 forEach 실행
        if (Array.isArray(character.scenarios.scenarioList)) {
          character.scenarios.scenarioList.forEach((scenario) => {
            scenario.isChecked = !allChecked;
          });
        }
      });
    },
    toggleCharacter: (state, action) => {
      const character: ICharacter | undefined = state.characters.find((char) => char.id === action.payload);
      if (character) {
        const newCheckedStatus: boolean = !character.isChecked;
        character.isChecked = newCheckedStatus;
        // scenarios가 배열일 때만 forEach 실행
        if (Array.isArray(character.scenarios.scenarioList)) {
          character.scenarios.scenarioList.forEach((scenario) => {
            scenario.isChecked = newCheckedStatus;
          });
        }
      }
    },
    toggleScenario: (state, action) => {
      const { characterId, scenarioId }: { characterId: number; scenarioId: number } = action.payload;
      const character: ICharacter | undefined = state.characters.find((char) => char.id === characterId);

      if (character) {
        const scenario: IScenario | undefined = character.scenarios.scenarioList.find((scn) => scn.scenarioId === scenarioId);
        if (scenario) {
          scenario.isChecked = !scenario.isChecked;

          // scenarios가 배열일 때만 every로 체크 여부 계산
          if (Array.isArray(character.scenarios)) {
            const allScenariosChecked: boolean = character.scenarios.every((scn) => scn.isChecked); // 전체 시나리오 선택 여부
            character.isChecked = allScenariosChecked;
          }
        }
      }
    },
    resetChecks: (state) => {
      state.characters.forEach((character) => {
        character.isChecked = false;
        // scenarios가 배열일 때만 forEach 실행
        if (Array.isArray(character.scenarios)) {
          character.scenarios.forEach((scenario) => {
            scenario.isChecked = false;
          });
        }
      });
    },
    deleteScenarios: (state, action) => {
      state.characters.forEach((character) => {
        character.scenarios.scenarioList = character.scenarios.scenarioList.filter((scenario) => scenario.scenarioId !== action.payload);
      });
    },
    deleteCharacters: (state, action) => {
      state.characters = state.characters.filter((character) => character.id !== action.payload);
    },
  },
});

export const { edit, toggleAll, deleteAllCharacter, newCharacter, deleteCharacters, toggleCharacter, toggleScenario, resetChecks, deleteScenarios } =
  scenarioReducer.actions;
export default scenarioReducer.reducer;
