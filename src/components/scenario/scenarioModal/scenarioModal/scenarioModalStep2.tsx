import React from 'react';
import { useDispatch } from 'react-redux';

import type { TRequestCharacterScenarioResponse } from '@/types/scenario/scenario';

import * as S from './scenarioModalStep.style';
import Button from '../../../common/button/button';

import { closeModal } from '@/slices/modalSlice';

type TItem = {
  step: string;
  actionDescription: string;
};

type TScenarioModalStep2 = {
  characterData: TRequestCharacterScenarioResponse | undefined;
  setModalStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScenarioModalStep2({ characterData, setModalStep }: TScenarioModalStep2) {
  const dispatch = useDispatch();
  const parsedData = characterData?.result.scenarioDescription ? JSON.parse(characterData.result.scenarioDescription) : null;
  return (
    <S.ConfirmModalContainer>
      <S.DescriptionContainer>
        <S.DescriptionItem>
          <S.SubTitle>Character</S.SubTitle>
          <S.DescriptionContent>{characterData?.result.characterName}</S.DescriptionContent>
        </S.DescriptionItem>
        <S.DescriptionItem>
          <S.SubTitle>Description</S.SubTitle>
          <S.DescriptionContent>{characterData?.result.characterDescription}</S.DescriptionContent>
        </S.DescriptionItem>
        <S.DescriptionItem>
          <S.SubTitle>Access control</S.SubTitle>
          <S.AccessControlItems>
            {characterData?.result.accessPage.map((page, index) => (
              <S.DescriptionContent key={index}>
                {page}
                {index !== characterData.result.accessPage.length - 1 ? ', ' : ''}
              </S.DescriptionContent>
            ))}
          </S.AccessControlItems>
        </S.DescriptionItem>
      </S.DescriptionContainer>

      <S.ScenarioContainer>
        <S.SubTitle>Scenario</S.SubTitle>
        <S.MainScenarioWrapper>
          {parsedData.map((item: TItem) => (
            <S.ScenarioDescription key={item.step}>
              {item.step}. {item.actionDescription}
            </S.ScenarioDescription>
          ))}
        </S.MainScenarioWrapper>
      </S.ScenarioContainer>

      <S.ButtonContainer>
        <Button color="mint" onClick={() => setModalStep(1)}>
          Edit and Request
        </Button>
        <Button color="blue" onClick={() => dispatch(closeModal())}>
          Save
        </Button>
      </S.ButtonContainer>
    </S.ConfirmModalContainer>
  );
}
