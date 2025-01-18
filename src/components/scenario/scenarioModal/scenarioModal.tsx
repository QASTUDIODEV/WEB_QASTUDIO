import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Modal from '@/components/common/modal/modal';
import Dropdown from '@/components/scenario/dropDown/dropDown';
import * as S from '@/components/scenario/scenarioModal/scenarioModal.style';

import DelCircle from '@/assets/icons/del_circle.svg?react';
import { setOpen } from '@/slices/modalSlice.ts';

export default function ScenarioModal() {
  const dispatch = useDispatch();
  const [modalStep, setModalStep] = useState(1); // 모달 단계 상태 (1: 역할 선택, 2: 역할 확인)
  const [options, setOptions] = useState<string[]>(['/', '/roadmap', '/login', '/ex1', '/ex2', '/ex3']); // 전체 옵션
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // 선택된 옵션

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  // 역할 생성 함수
  const handleCreate = (data: any) => {
    //역할 생성
    console.log(data);
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
    <Modal title={'Create Character'} onClose={() => dispatch(setOpen())}>
      {modalStep === 1 ? (
        // 역할 선택 단계
        <form onSubmit={handleSubmit(handleCreate)}>
          <S.ModalContainer>
            <div>
              <S.description>Define users for the registered project.</S.description>
              <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
            </div>

            <S.InputWrapper>
              <S.SubTitle>Name</S.SubTitle>
              <Input placeholder="Define the target character in one sentence." type="normal" {...register('name', { required: 'Name is required' })} />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.SubTitle>Description</S.SubTitle>
              <Input
                placeholder="Explain the character's purpose for using the project."
                type="normal"
                {...register('description', { required: 'Description is required' })}
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
              <S.ButtonWrapper>
                <Button color="blue" onClick={handleSubmit(handleCreate)} disabled={!isValid || selectedOptions.length === 0}>
                  Create
                </Button>
              </S.ButtonWrapper>
            </S.ButtonContainer>
          </S.ModalContainer>
        </form>
      ) : (
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
            <S.SubTitle>Main Senario</S.SubTitle>
            <S.MainScenarioWrapper>
              <S.ScenarioDescription>1. 로그인 페이지에 접근한다.</S.ScenarioDescription>
              <S.ScenarioDescription>2. 이메일 입력란에 이메일을 입력한다. </S.ScenarioDescription>
              <S.ScenarioDescription>3. 비밀번호 입력란에 비밀번호를 입력한다.</S.ScenarioDescription>
              <S.ScenarioDescription>4. 확인 버튼을 클릭한다.</S.ScenarioDescription>
            </S.MainScenarioWrapper>
          </S.ScenarioContainer>

          <S.ButtonContainer>
            <S.LongButtonWrapper>
              <Button color="mint" onClick={() => setModalStep(1)}>
                Edit and Request
              </Button>
            </S.LongButtonWrapper>
            <S.ButtonWrapper>
              <Button color="blue" onClick={() => dispatch(setOpen())}>
                Close
              </Button>
            </S.ButtonWrapper>
          </S.ButtonContainer>
        </S.ConfirmModalContainer>
      )}
    </Modal>
  );
}
