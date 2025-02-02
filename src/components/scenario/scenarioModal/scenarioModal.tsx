import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { TProjectPath, TRequestCharacterScenarioResponse } from '@/types/scenario/scenario';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import useGetScenarioModalInfo from '@/hooks/scenario/useGetScenarioModal';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import Dropdown from '@/components/scenario/dropDown/dropDown';
import * as S from '@/components/scenario/scenarioModal/scenarioModal.style';

import DelCircle from '@/assets/icons/del_circle.svg?react';
import { closeModal } from '@/slices/modalSlice.ts';

type TScenarioProps = {
  projectId: string;
};

type TFormValues = {
  projectId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
};

export default function ScenarioModal({ projectId }: TScenarioProps) {
  const dispatch = useDispatch();
  const [modalStep, setModalStep] = useState(1); // 모달 단계 상태 (1: 역할 선택, 2: 역할 확인)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 선택된 옵션
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scenarioId, setScenarioId] = useState<number>();
  const [characterId, setCharacterId] = useState<number>();
  const [characterData, setCharacterData] = useState<TRequestCharacterScenarioResponse>();
  const [errorMessage, setErrorMessage] = useState('');
  const { useGetAllPaths, usePostCharacter, usePatchCharacter } = useGetScenarioModalInfo({ projectId });
  const { data: PathData } = useGetAllPaths;
  const { mutate: postCharacter } = usePostCharacter;
  const { mutate: patchCharacter } = usePatchCharacter;

  const [options] = useState<TProjectPath[]>(PathData?.result?.projectPaths || []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TFormValues>({
    mode: 'onChange',
  });

  // 역할 생성 함수

  const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
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
          },
          onError: () => {
            setErrorMessage('Failed to create character');
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
            },
            onError: () => {
              setErrorMessage('Failed to create character');
            },
          },
        );
      } else {
        setErrorMessage('Scenario ID is undefined');
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
    <Modal title={'Create Character'} onClose={() => dispatch(closeModal())}>
      {modalStep === 1 && (
        // 역할 선택 단계
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ModalContainer>
            <div>
              <S.description>Define users for the registered project.</S.description>
              <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
            </div>

            <S.InputWrapper>
              <S.SubTitle>Name</S.SubTitle>
              <Input
                placeholder="Define the target character in one sentence."
                type="normal"
                {...register('characterName', { required: 'Name is required' })}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.SubTitle>Description</S.SubTitle>
              <Input
                placeholder="Explain the character's purpose for using the project."
                type="normal"
                {...register('characterDescription', { required: 'Description is required' })}
              />
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
              <Button color="blue" onClick={handleSubmit(onSubmit)} disabled={!isValid || selectedOptions.length === 0}>
                Create
              </Button>
            </S.ButtonContainer>
          </S.ModalContainer>
        </form>
      )}
      {modalStep == 2 && (
        // 역할 확인 상태
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
              {characterData?.result.accessPage.map((page, index) => <S.DescriptionContent key={index}>{page}</S.DescriptionContent>)}
            </S.DescriptionItem>
          </S.DescriptionContainer>

          <S.ScenarioContainer>
            <S.SubTitle>Scenario</S.SubTitle>
            <S.MainScenarioWrapper>
              <S.ScenarioDescription>{characterData?.result.scenarioDescription}</S.ScenarioDescription>
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
      )}
    </Modal>
  );
}
