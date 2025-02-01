import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import useGetScenarioModalInfo from '@/hooks/scenario/useGetScenarioModal';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
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
  const [scenarioId, setScenarioId] = useState<number>(0);
  const [characterId, setCharacterId] = useState<number>(0);

  const { useGetAllPaths, usePostCharacter, usePatchCharacter } = useGetScenarioModalInfo({ projectId });
  const { data: PathData } = useGetAllPaths;
  console.log(PathData);
  const { mutate: postCharacter } = usePostCharacter;
  const { mutate: patchCharacter } = usePatchCharacter;

  // const [options] = useState<string[]>(PathData.result.projectPaths);
  const [options] = useState<string[]>(['/', '/roadmap', '/login', '/ex1', '/ex2', '/ex3']); // 전체 옵션

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
            setIsSubmitted(true);
            setCharacterId(data.result.characterId);
            setScenarioId(data.result.scenarioId);
          },
        },
      );
    } else {
      patchCharacter(
        {
          projectId: Number(projectId),
          characterName: submitData.characterName,
          characterDescription: submitData.characterDescription,
          accessPage: selectedOptions,
          characterId: characterId,
          scenarioId: scenarioId,
        },
        { onSuccess: () => setIsSubmitted(true) },
      );
    }
    //역할 생성
    console.log(submitData);
    setModalStep(2);
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
              <S.DescriptionContent>사용자</S.DescriptionContent>
            </S.DescriptionItem>
            <S.DescriptionItem>
              <S.SubTitle>Description</S.SubTitle>
              <S.DescriptionContent>로그인을 하는 사용자</S.DescriptionContent>
            </S.DescriptionItem>
            <S.DescriptionItem>
              <S.SubTitle>Access control</S.SubTitle>
              <S.DescriptionContent>/, /roadmap</S.DescriptionContent>
            </S.DescriptionItem>
          </S.DescriptionContainer>

          <S.ScenarioContainer>
            <S.SubTitle>Scenario</S.SubTitle>
            <S.MainScenarioWrapper>
              <S.ScenarioDescription>1. 로그인 페이지에 접근한다.</S.ScenarioDescription>
              <S.ScenarioDescription>2. 이메일 입력란에 이메일을 입력한다. </S.ScenarioDescription>
              <S.ScenarioDescription>3. 비밀번호 입력란에 비밀번호를 입력한다.</S.ScenarioDescription>
              <S.ScenarioDescription>4. 확인 버튼을 클릭한다.</S.ScenarioDescription>
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
