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
      createdAt: 'a few seconds ago',
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
      createdAt: 'a few seconds ago',
      isExpanded: false,
      scenarios: [{ id: 3, name: 'Scenario 3', createdBy: 'User 3', createdAt: 'a few seconds ago', isChecked: false }],
    },
  ],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    edit: (state) => {
      state.isEdit = !state.isEdit;
    },
    toggleAll: (state) => {
      const allChecked = state.characters.every((character) => character.isChecked);
      state.characters.forEach((character) => {
        character.isChecked = !allChecked;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = !allChecked;
        });
      });
    },
    toggleCharacter: (state, action) => {
      const character = state.characters.find((char) => char.id === action.payload);
      if (character) {
        const newCheckedStatus = !character.isChecked;
        character.isChecked = newCheckedStatus;
        character.scenarios.forEach((scenario) => {
          scenario.isChecked = newCheckedStatus;
        });
      }
    },
    toggleScenario: (state, action) => {
      const { characterId, scenarioId } = action.payload;
      const character = state.characters.find((char) => char.id === characterId);
      if (character) {
        const scenario = character.scenarios.find((scn) => scn.id === scenarioId);
        if (scenario) {
          scenario.isChecked = !scenario.isChecked;
        }
      }
    },
    toggleExpand: (state, action) => {
      const character = state.characters.find((char) => char.id === action.payload);
      if (character) {
        character.isExpanded = !character.isExpanded;
      }
    },
  },
});

export const { edit, toggleAll, toggleCharacter, toggleScenario, toggleExpand } = characterSlice.actions;
export default characterSlice.reducer;
