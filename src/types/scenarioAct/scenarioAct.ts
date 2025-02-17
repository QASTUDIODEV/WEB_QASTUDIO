import type { TCommonResponse } from '../common/common';

export type TGetCharacterListResponse = TCommonResponse<{
  detailCharacters: [
    {
      characterId: number;
      characterName: string;
      author: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}>;

export type TGetProjectInfoResponse = TCommonResponse<{
  projectId: number;
  projectImage: string;
  projectName: string;
  projectUrl: string;
  introduction: string;
  viewType: string;
  developmentSkill: string;
  assistantId: string;
}>;

export type TGetScenarioListResponse = TCommonResponse<{
  characterId: number;
  scenarios: [
    {
      scenarioId: number;
      scenarioName: string;
      scenarioDescription: string;
      actions: [
        {
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
        },
      ];
    },
  ];
}>;
export type TEditActionResponse = TCommonResponse<{
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
}>;

export type TCreateScenarioResponse = TCommonResponse<{
  id: number;
  scenarioName: string;
  scenarioDescription: string;
}>;

export type TExecuteScenarioResponse = TCommonResponse<{
  status: string;
  logs: string[];
  testId: number;
}>;

export type TFetchPageSourceResponse = TCommonResponse<{
  status: string;
  logs: string[];
  html: string;
  css: string;
}>;

export type TGetScenarioInfoResponse = TCommonResponse<{
  scenarioId: number;
  scenarioName: string;
  scenarioDescription: string;
  actions: [
    {
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
    },
  ];
}>;

export type TPatchScenarioInfoResponse = TCommonResponse<{
  scenarioName: string;
  scenarioDescription: string;
  actions: [
    {
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
    },
  ];
}>;

// --value--
export type TGetProjectInfoValues = {
  projectId?: number;
  characterId?: number;
  scenarioId?: number;
};

export type TEditActionValues = {
  actionId: number | undefined;
  data: {
    actionDescription: string | undefined;
    step: number | undefined;
    actionType: string | undefined;
    locator: {
      strategy: string | undefined;
      value: string | undefined;
    };
    action: {
      type: string | undefined;
      value: string | undefined;
    };
  };
};

export type TCreateScenaioValues = {
  characterId: number;
  pageId: number;
  scenarioName: string;
  scenarioDescription: string;
  actions: {
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
  }[];
};

export type TExecuteScenarioValues = {
  sessionId: string | null;
  scenarioId: number | null;
  baseUrl: string | null;
};

export type TFetchPageSourceValues = {
  targetUrl: string | null;
};

export type TPatchScenarioInfo = {
  scenarioId: number | null;
  data: {
    characterId: number | null;
    scenarioName: string | null;
    scenarioDescription: string | null;
    actions: {
      actionDescription: string | null;
      step: number | null;
      actionType: string | null;
      locator: {
        strategy: string | null;
        value: string | null;
      };
      action: {
        type: string | null;
        value: string | null;
      };
    }[];
  };
};
