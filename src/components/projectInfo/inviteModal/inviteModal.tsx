import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import useDebounce from '@/hooks/common/useDebounce';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';
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
  const { useGetTeamMember } = useTeamMember({ projectId, email: debouncedEmail });
  const { useGetMemberEmail } = useProjectInfo({ projectId });

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);

  const { data: memberEmail } = useGetMemberEmail;
  const { data } = useGetTeamMember;

  const [memberEmails, setMemberEmails] = useState<TEmailList>([]);

  useEffect(() => {
    if (memberEmail?.result?.userEmails) {
      setMemberEmails(memberEmail.result.userEmails);
    }
  }, [memberEmail]);

  const members = memberEmails.map((a) => a.email);

  useEffect(() => {
    if (data?.result?.userEmails.some((userEmail) => userEmail.email === debouncedEmail)) {
      const existingEmails = memberEmailList.map((member) => member.email);
      const newEmails = data.result.userEmails.filter((userEmail) => userEmail.email === debouncedEmail && !existingEmails.includes(userEmail.email));

      if (newEmails.length > 0) {
        setMemberEmailList((prev) => [...prev, ...newEmails]);
        setIsEmailValid(true);
      }
    } else {
      setIsEmailValid(false);
    }
  }, [data, debouncedEmail]);
  const FirstValid: boolean = (touchedFields.email && errors.email?.message) as boolean;

  const handleAddEmail = () => {
    if (!debouncedEmail.trim()) return;

    const isDuplicate =
      emails.includes(debouncedEmail) || // 이미 추가된 이메일
      members.includes(debouncedEmail); // 이미 프로젝트에 존재하는 이메일

    if (isDuplicate) return;

    if (!isEmailValid) {
      setValue('email', '');
      return;
    }

    setEmails((prev) => [...prev, debouncedEmail]);
    setValue('email', '');
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleCreate = () => {
    setEmails([]);
    onClose();
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
              <Input placeholder="invite others by email" type="normal" {...field} errorMessage={errors.email?.message} touched={touchedFields.email} />
            )}
          />
          <Button type="act" color="blue" onClick={handleAddEmail} disabled={!debouncedEmail.trim() || !isEmailValid}>
            Share
          </Button>
        </S.BtnWrapper>
        {FirstValid && <ValidataionMessage message={errors.email?.message || ''} isError={!!errors.email} />}
        {!FirstValid && !isEmailValid && debouncedEmail && (
          <ValidataionMessage message={'This email is either unregistered or already added.'} isError={!isEmailValid} />
        )}
        <S.tagWrapper>
          {emails.map((email) => (
            <Button key={email} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(email)}>
              {email}
            </Button>
          ))}
        </S.tagWrapper>
        <S.Position>
          <Button type="act" color="blue" onClick={handleCreate} disabled={emails.length === 0}>
            Create
          </Button>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
