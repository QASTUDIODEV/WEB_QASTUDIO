import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/inviteModal/inviteModal.style';

import Delcircle from '@/assets/icons/del_circle.svg?react';

type TInviteModalProps = {
  onClose: () => void; // 모달 닫기 함수
};

type TFormData = {
  email: string;
};

export default function InviteModal({ onClose }: TInviteModalProps) {
  const [emails, setEmails] = useState<string[]>([]); // 입력된 이메일 리스트

  const {
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email'); // 이메일 값 실시간 추적

  const handleAddEmail = () => {
    const email = emailValue.trim();
    if (email && !emails.includes(email)) {
      setEmails((prev) => [...prev, email]);
      setValue('email', ''); // 입력 필드 초기화
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToRemove));
  };

  const handleCreate = () => {
    console.log('Emails:', emails); // 입력된 이메일 리스트 출력
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
                <Input placeholder="invite others by email" type="normal" {...field} errorMessage={errors.email?.message} touched={!!errors.email} />
              </>
            )}
          />
          <Button
            type="normal"
            color="gray"
            onClick={handleAddEmail}
            disabled={
              !emailValue.trim() || // 값이 비어 있으면 비활성화
              !!errors.email || // 유효성 검사 에러가 있으면 비활성화
              emails.includes(emailValue.trim()) // 이미 추가된 이메일이면 비활성화
            }
          >
            Share
          </Button>
        </S.BtnWrapper>
        <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />
        {/* 이메일 태그 리스트 */}
        <S.BtnWrapper>
          {emails.map((email) => (
            <Button key={email} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(email)}>
              {email}
            </Button>
          ))}
        </S.BtnWrapper>
        {/* Create 버튼 */}
        <S.Position>
          <Button type="normal" color="blue" onClick={handleCreate} disabled={emails.length === 0}>
            Create
          </Button>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
