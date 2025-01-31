import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/characterModal/characterModal.style';
import Dropdown from '@/components/projectInfo/dropDown/dropDown';

import DelCircle from '@/assets/icons/del_circle.svg?react';

type TCharacterModalProps = {
  onClose: () => void;
  projectId: number;
};
type TFormData = {
  characterName: string;
  characterDescription: string;
  accessPage: string;
};
export default function CharacterModal({ onClose, projectId = 0 }: TCharacterModalProps) {
  const [modalStep, setModalStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { useGetPath } = useProjectInfo({ projectId });
  const { data } = useGetPath;
  const path = data?.result.projectPaths.map((a) => a.path);
  const {
    control,
    formState: { errors, isValid, touchedFields },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      characterName: '',
      characterDescription: '',
      accessPage: '',
    },
  });
  const handleCreate = () => {
    setModalStep(2);
  };

  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };

  return (
    <Modal title={'Create Character'} onClose={onClose}>
      {modalStep === 1 ? (
        <S.ModalContainer>
          <div>
            <S.description>Define users for the registered project.</S.description>
          </div>

          <S.InputWrapper>
            <S.SubTitle>Name</S.SubTitle>
            <Controller
              name="characterName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Character Name is required',
                },
                minLength: {
                  value: 3,
                  message: 'Character Name must be at least 3 characters',
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    placeholder="Define the target character in one sentence."
                    type="normal"
                    {...field}
                    errorMessage={errors.characterName?.message}
                    touched={!!errors.characterName}
                  />
                  {touchedFields.characterName && errors.characterName?.message && (
                    <ValidataionMessage message={errors.characterName?.message || ''} isError={!!errors.characterName} />
                  )}
                </>
              )}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.SubTitle>Description</S.SubTitle>
            <Controller
              name="characterDescription"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Character Description is required',
                },
                minLength: {
                  value: 3,
                  message: 'Character Description must be at least 3 characters',
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    placeholder="Explain the character's purpose for using the project."
                    type="normal"
                    {...field}
                    errorMessage={errors.characterDescription?.message}
                    touched={!!errors.characterDescription}
                  />
                  {touchedFields.characterDescription && errors.characterDescription?.message && (
                    <ValidataionMessage message={errors.characterDescription?.message || ''} isError={!!errors.characterDescription} />
                  )}
                </>
              )}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.SubTitle>Access page</S.SubTitle>
            <Dropdown options={path as string[]} onSelect={handleSelect} placeholder="Select pages accessible to the character." />
          </S.InputWrapper>
          {selectedOptions && (
            <S.TagContainer>
              {selectedOptions.map((option) => (
                <Button key={option} type="tag" color="mint" icon={<DelCircle />} iconPosition="right" onClick={() => handleRemove(option)}>
                  {option}
                </Button>
              ))}
            </S.TagContainer>
          )}

          <S.ButtonContainer>
            <Button type="act" color="blue" onClick={handleCreate} disabled={!isValid || !selectedOptions[0]}>
              Create
            </Button>
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
            <Button type="act" color="mint" onClick={onClose}>
              Edit and Request
            </Button>
            <Button type="act" color="blue" onClick={onClose}>
              Close
            </Button>
          </S.ButtonContainer>
        </S.ConfirmModalContainer>
      )}
    </Modal>
  );
}
