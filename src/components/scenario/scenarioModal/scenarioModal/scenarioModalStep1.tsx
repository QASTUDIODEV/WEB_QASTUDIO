import React, { useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import type { UseMutateFunction } from '@tanstack/react-query';

import type {
  TRequestCharacterScenarioResponse,
  TRequestPatchCharacterScenarioValue,
  TRequestPostCharacterScenarioValue,
  TResponseAIError,
} from '@/types/scenario/scenario';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { queryClient } from '@/apis/queryClient';

import useGetScenarioModalInfo from '@/hooks/scenario/useGetScenarioInfo';

import * as S from './scenarioModalStep.style';
import Button from '../../../common/button/button';
import Input from '../../../common/input/input';
import ValidataionMessage from '../../../common/input/validationMessage';
import Dropdown from '../../../projectInfo/dropDown/dropDown';

import CheckBoxFalseIcon from '@/assets/icons/check box_false.svg?react';
import CheckBoxTrueIcon from '@/assets/icons/check box_true.svg?react';
import DelCircle from '@/assets/icons/del_circle.svg?react';

type TFormValues = {
  projectId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
};

type TScenarioProps = {
  projectId: string;
  currentPage: number;
  setCharacterData: React.Dispatch<React.SetStateAction<TRequestCharacterScenarioResponse | undefined>>;
  setModalStep: React.Dispatch<React.SetStateAction<number>>;
  patchCharacter: UseMutateFunction<TRequestCharacterScenarioResponse, TResponseAIError, TRequestPatchCharacterScenarioValue, unknown>;
  postCharacter: UseMutateFunction<TRequestCharacterScenarioResponse, TResponseAIError, TRequestPostCharacterScenarioValue, unknown>;
  postCharacterPending: boolean;
  patchCharacterPending: boolean;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  scenarioId: number;
  setScenarioId: React.Dispatch<React.SetStateAction<number>>;
  characterId: number;
  setCharacterId: React.Dispatch<React.SetStateAction<number>>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ScenarioModalStep1({
  patchCharacter,
  postCharacter,
  setModalStep,
  setCharacterData,
  setSelectedOptions,
  setIsSubmitted,
  setCharacterId,
  setScenarioId,
  setChecked,
  postCharacterPending,
  patchCharacterPending,
  projectId,
  scenarioId,
  characterId,
  currentPage,
  selectedOptions,
  isSubmitted,
  checked,
}: TScenarioProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const { useGetAllPaths } = useGetScenarioModalInfo({ projectId, currentPage });

  const { data: PathData } = useGetAllPaths;

  const options = useMemo(() => PathData?.result?.projectPaths?.map((pathData) => pathData.path) ?? [], [PathData]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const watchedCharacterName = useWatch({
    control,
    name: 'characterName',
  });

  const watchedCharacterDescription = useWatch({
    control,
    name: 'characterDescription',
  });

  useEffect(() => {
    setErrorMessage('');
    setValue('accessPage', selectedOptions);
  }, [selectedOptions]);

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_CHARACTER_LIST({ projectId, currentPage }),
    });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.CHARACTER({ projectId: Number(projectId) }),
    });
  };

  const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
    setErrorMessage('');
    if (!isSubmitted) {
      postCharacter(
        {
          projectId: Number(projectId),
          characterName: submitData.characterName,
          characterDescription: submitData.characterDescription,
          accessPage: selectedOptions,
          aiScenario: checked,
        },
        {
          onSuccess: (data) => {
            setErrorMessage('');
            setCharacterData(data);
            setIsSubmitted(true);
            setCharacterId(data.result.characterId);
            setScenarioId(data.result.scenarioId);
            setModalStep(2);
            invalidateQueries();
          },
          onError: (error) => {
            setErrorMessage(error.response?.data?.detail || 'An error occurred');
          },
        },
      );
    } else {
      if (scenarioId !== undefined && characterId !== undefined) {
        patchCharacter(
          {
            projectId: Number(projectId),
            characterName: submitData.characterName,
            characterDescription: submitData.characterDescription,
            accessPage: selectedOptions,
            characterId: characterId,
            scenarioId: scenarioId,
            aiScenario: checked,
          },
          {
            onSuccess: (data) => {
              setErrorMessage('');
              setCharacterData(data);
              setIsSubmitted(true);
              setModalStep(2);
              invalidateQueries();
            },
            onError: (error) => {
              setErrorMessage(error.response?.data?.detail || 'An error occurred');
            },
          },
        );
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  // 선택된 옵션 추가 함수
  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  // 선택된 옵션 제거 함수
  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.ModalContainer>
        <div className="descriptionWrapper">
          <S.description>Define users for the registered project.</S.description>
          <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
        </div>

        <S.InputWrapper>
          <S.SubTitle>Name</S.SubTitle>
          {errors.characterName?.message && (
            <S.ValidationWrapper>
              <ValidataionMessage message={errors.characterName.message as string} isError={true} />
            </S.ValidationWrapper>
          )}
          <Input type="normal" placeholder="Define the target character in one sentence." {...register('characterName')} />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.SubTitle>Description</S.SubTitle>
          {errors.characterDescription?.message && (
            <S.ValidationWrapper>
              <ValidataionMessage message={errors.characterDescription.message as string} isError={true} />
            </S.ValidationWrapper>
          )}
          <Input placeholder="Explain the character's purpose for using the project." type="normal" {...register('characterDescription')} />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.SubTitle>Access page</S.SubTitle>
          <Dropdown options={options} onSelect={handleSelect} placeholder="Select pages accessible to the character." />
        </S.InputWrapper>

        <S.TagContainer>
          {selectedOptions.map((option) => (
            <Button key={option} type="tag" color="mint" icon={<DelCircle />} iconPosition="right" onClick={() => handleRemove(option)}>
              {option}
            </Button>
          ))}
        </S.TagContainer>
        <S.ButtonContainer>
          {checked ? (
            <S.CheckboxContainer onClick={() => setChecked(!checked)}>
              <CheckBoxTrueIcon />
              <div>Create scenarios with AI</div>
            </S.CheckboxContainer>
          ) : (
            <S.CheckboxContainer onClick={() => setChecked(!checked)}>
              <CheckBoxFalseIcon />
              <div>Create scenarios with AI</div>
            </S.CheckboxContainer>
          )}

          <S.RightSideComponents>
            {errorMessage !== '' ? <ValidataionMessage message={errorMessage} isError={!!errorMessage} /> : <div />}
            <Button
              color="blue"
              onClick={handleSubmit(onSubmit)}
              disabled={
                selectedOptions.length < 1 ||
                postCharacterPending ||
                patchCharacterPending ||
                !!errors.characterName ||
                !!errors.characterDescription ||
                watchedCharacterDescription === '' ||
                watchedCharacterName === ''
              }
            >
              Create
            </Button>
          </S.RightSideComponents>
        </S.ButtonContainer>
      </S.ModalContainer>
    </form>
  );
}
