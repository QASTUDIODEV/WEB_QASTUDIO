import { useState } from 'react';

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

  // 역할 생성 함수
  const handleCreate = () => {
    //역할 생성
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
    <Modal title={modalStep === 1 ? 'Create Character' : 'Scenario Created'} onClose={() => dispatch(setOpen())}>
      {modalStep === 1 ? (
        // 역할 선택 단계
        <S.ModalContainer>
          <div>
            <S.description>Define users for the registered project.</S.description>
            <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
          </div>

          <S.InputWrapper>
            <S.InputTitle>Name</S.InputTitle>
            <Input placeholder="Define the target character in one sentence." type="normal" />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Description</S.InputTitle>
            <Input placeholder="Explain the character's purpose for using the project." type="normal" />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputTitle>Access page</S.InputTitle>
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
              <Button color="blue" onClick={handleCreate}>
                Create
              </Button>
            </S.ButtonWrapper>
          </S.ButtonContainer>
        </S.ModalContainer>
      ) : (
        // 역할 확인 상태
        <S.ModalContainer>
          <div />
          <S.ButtonContainer>
            <S.ButtonWrapper>
              <Button color="blue" onClick={() => dispatch(setOpen())}>
                Close
              </Button>
            </S.ButtonWrapper>
          </S.ButtonContainer>
        </S.ModalContainer>
      )}
    </Modal>
  );
}
