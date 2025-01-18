import { useState } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/characterModal/characterModal.style';
import Dropdown from '@/components/projectInfo/dropDown/dropDown';

import DelCircle from '@/assets/icons/del_circle.svg?react';

type TCharacterModalProps = {
  onClose: () => void;
};

export default function CharacterModal({ onClose }: TCharacterModalProps) {
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
    <Modal title={'Create Character'} onClose={onClose}>
      {modalStep === 1 ? (
        // 역할 선택 단계
        <S.ModalContainer>
          <div>
            <S.description>Define users for the registered project.</S.description>
            <S.description>QASTUDIO will create a suitable scenario for you.</S.description>
          </div>

          <S.InputWrapper>
            <S.SubTitle>Name</S.SubTitle>
            <Input placeholder="Define the target character in one sentence." type="normal" />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.SubTitle>Description</S.SubTitle>
            <Input placeholder="Explain the character's purpose for using the project." type="normal" />
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
              <Button color="blue" onClick={handleCreate}>
                Create
              </Button>
            </S.ButtonWrapper>
          </S.ButtonContainer>
        </S.ModalContainer>
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
              <Button color="mint" onClick={onClose}>
                Edit and Request
              </Button>
            </S.LongButtonWrapper>
            <S.ButtonWrapper>
              <Button color="blue" onClick={onClose}>
                Close
              </Button>
            </S.ButtonWrapper>
          </S.ButtonContainer>
        </S.ConfirmModalContainer>
      )}
    </Modal>
  );
}
