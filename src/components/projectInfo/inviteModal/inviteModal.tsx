import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import useDebounce from '@/hooks/common/useDebounce';
import useTeamMember from '@/hooks/sidebar/useGetTeamMember';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/inviteModal/inviteModal.style';

import Delcircle from '@/assets/icons/del_circle.svg?react';

type TInviteModalProps = {
  onClose: () => void; // 모달 닫기 함수
  projectId: number;
};

type TFormData = {
  email: string;
};
type TEmailList = {
  userId: number;
  email: string;
}[];
export default function InviteModal({ onClose, projectId }: TInviteModalProps) {
  const [emails, setEmails] = useState<string[]>([]); // 입력된 이메일 리스트
  const {
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const emailValue = useWatch({ control, name: 'email' })?.trim() || '';
  const debouncedEmail = useDebounce(emailValue, 800);
  const { useGetTeamMember } = useTeamMember({ projectId: projectId, email: debouncedEmail }); // 이메일 유효성 확인
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);
  const { data } = useGetTeamMember;
  useEffect(() => {
    if (data && data.result.userEmails.some((userEmail) => userEmail.email === debouncedEmail)) {
      const existingEmails = memberEmailList.map((member) => member.email);
      const newEmails = data.result.userEmails.filter((userEmail) => userEmail.email === debouncedEmail && !existingEmails.includes(userEmail.email));

      if (newEmails.length > 0) {
        setMemberEmailList((prev) => [...prev, ...newEmails]); // 유효한 이메일만 추가
        setIsEmailValid(true); // 이메일 유효성 상태 업데이트
      }
    } else {
      setIsEmailValid(false); // 이메일이 유효하지 않음
    }
  }, [data, debouncedEmail]);
  const FirstValid: boolean = (touchedFields.email && errors.email?.message) as boolean;

  const handleAddEmail = () => {
    if (!debouncedEmail || emails.includes(debouncedEmail)) {
      return; // 이메일이 비어 있거나 이미 추가된 경우
    }

    if (!isEmailValid) {
      setValue('email', '');
      return; // 유효하지 않은 이메일이면 추가하지 않음
    }

    setEmails((prev) => [...prev, debouncedEmail]); // 이메일 추가
    setValue('email', ''); // 입력 필드 초기화
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToRemove));
  };

  const handleCreate = () => {
    setEmails([]);
    onClose(); // 모달 닫기
  };

  return (
    <Modal title="Invite Member" onClose={onClose}>
      <S.ModalBox>
        <S.ModalText>Enter the new member's email.</S.ModalText>
        <S.ModalText>Share this project</S.ModalText>
        <S.BtnWrapper>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <>
                <Input placeholder="invite others by email" type="normal" {...field} errorMessage={errors.email?.message} touched={touchedFields.email} />
              </>
            )}
          />
          <Button
            type="act"
            color="blue"
            onClick={handleAddEmail}
            disabled={!debouncedEmail.trim() || emails.includes(debouncedEmail.trim()) || !!errors.email || !isEmailValid}
          >
            Share
          </Button>
        </S.BtnWrapper>
        {FirstValid && <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />}
        {!FirstValid && !isEmailValid && debouncedEmail && (
          <ValidataionMessage message={'This email is either unregistered or already added.'} isError={!isEmailValid} />
        )}
        {/* 이메일 태그 리스트 */}
        <S.tagWrapper>
          {emails.map((email) => (
            <Button key={email} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(email)}>
              {email}
            </Button>
          ))}
        </S.tagWrapper>
        {/* Create 버튼 */}
        <S.Position>
          <Button type="act" color="blue" onClick={handleCreate} disabled={emails.length === 0}>
            Create
          </Button>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
