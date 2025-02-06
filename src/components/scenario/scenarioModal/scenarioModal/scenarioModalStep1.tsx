import React, { useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateFunction } from '@tanstack/react-query';

import type {
  TRequestCharacterScenarioResponse,
  TRequestPatchCharacterScenarioValue,
  TRequestPostCharacterScenarioValue,
  TResponseAIError,
} from '@/types/scenario/scenario';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { createCharacterModalScehma } from '@/utils/validate';
import { queryClient } from '@/apis/queryClient';

import useGetScenarioModalInfo from '@/hooks/scenario/useGetScenarioInfo';

import * as S from './scenarioModalStep.style';
import Button from '../../../common/button/button';
import Input from '../../../common/input/input';
import ValidataionMessage from '../../../common/input/validationMessage';
import Loading from '../../../common/loading/loading';
import Dropdown from '../../../projectInfo/dropDown/dropDown';

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
};

export default function ScenarioModalStep1({
  projectId,
  patchCharacter,
  postCharacter,
  currentPage,
  setModalStep,
  setCharacterData,
  postCharacterPending,
  patchCharacterPending,
}: TScenarioProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 선택된 옵션
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scenarioId, setScenarioId] = useState<number>();
  const [characterId, setCharacterId] = useState<number>();
  const [errorMessage, setErrorMessage] = useState('');

  const { useGetAllPaths } = useGetScenarioModalInfo({ projectId, currentPage });

  const { data: PathData } = useGetAllPaths;

  const options = useMemo(() => PathData?.result?.projectPaths ?? [], [PathData]);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createCharacterModalScehma),
  });

  useEffect(() => {
    setErrorMessage('');
  }, [selectedOptions]);

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_CHARACTER_LIST({ projectId, currentPage }),
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
        {(postCharacterPending || patchCharacterPending) && (
          <S.LoadingContainer2>
            <Loading />
          </S.LoadingContainer2>
        )}
        <div>
          <S.description>Define users for the registered project.</S.description>
          <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
        </div>

        <S.InputWrapper>
          <S.SubTitle>Name</S.SubTitle>
          {errors.characterName?.message && touchedFields.characterName && (
            <S.ValidationWrapper>
              <ValidataionMessage message={errors.characterName.message} isError={true} />
            </S.ValidationWrapper>
          )}
          <Input type="normal" placeholder="Define the target character in one sentence." {...register('characterName')} />
        </S.InputWrapper>
        <S.InputWrapper>
          <S.SubTitle>Description</S.SubTitle>
          {errors.characterDescription?.message && touchedFields.characterDescription && (
            <S.ValidationWrapper>
              <ValidataionMessage message={errors.characterDescription.message} isError={true} />
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
          {errorMessage !== '' ? <ValidataionMessage message={errorMessage} isError={!!errorMessage} /> : <div />}
          <Button
            color="blue"
            onClick={handleSubmit(onSubmit)}
            disabled={selectedOptions.length < 1 || postCharacterPending || patchCharacterPending || !isValid}
          >
            Create
          </Button>
        </S.ButtonContainer>
      </S.ModalContainer>
    </form>
  );
}
