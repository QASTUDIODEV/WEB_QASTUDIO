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
  characters: [],
};

const scenarioReducer = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    newCharacter: (state, action) => {
      state.characters = [...state.characters, action.payload];
    },
    resetCharacters: (state) => {
      state.characters = []; // characters 배열 초기화
    },
    edit: (state) => {
      state.isEdit = !state.isEdit;
    },
    toggleAll: (state) => {
      const allChecked: boolean = state.characters.every((character) => character.isChecked); // 전체 체크 여부
      state.characters.forEach((character) => {
        character.isChecked = !allChecked;
        // scenarios가 배열일 때만 forEach 실행
        if (Array.isArray(character.scenarios)) {
          character.scenarios.forEach((scenario) => {
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
        if (Array.isArray(character.scenarios)) {
          character.scenarios.forEach((scenario) => {
            scenario.isChecked = newCheckedStatus;
          });
        }
      }
    },
    toggleScenario: (state, action) => {
      const { characterId, scenarioId }: { characterId: number; scenarioId: number } = action.payload;
      const character: ICharacter | undefined = state.characters.find((char) => char.id === characterId);

      if (character) {
        const scenario: IScenario | undefined = character.scenarios.find((scn) => scn.id === scenarioId);
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
    toggleExpand: (state, action) => {
      const character: ICharacter | undefined = state.characters.find((char) => char.id === action.payload);
      if (character) {
        character.isExpanded = !character.isExpanded;
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
    selectEntity: (state, action) => {
      const { characterId, scenarioId = null }: { characterId: number | null; scenarioId: number | null } = action.payload;

      // 모든 캐릭터와 시나리오의 isSelected를 초기화
      state.characters.forEach((character) => {
        character.isSelected = false; // 캐릭터 선택 초기화
        // scenarios가 배열일 때만 forEach 실행
        if (Array.isArray(character.scenarios)) {
          character.scenarios.forEach((scenario) => {
            scenario.isSelected = false; // 시나리오 선택 초기화
          });
        }
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

export const { edit, toggleAll, resetCharacters, newCharacter, toggleCharacter, toggleScenario, toggleExpand, resetChecks, selectEntity } =
  scenarioReducer.actions;
export default scenarioReducer.reducer;
