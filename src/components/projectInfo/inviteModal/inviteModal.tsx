import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import useInviteMember from '@/hooks/projectInfo/useInviteMember';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

// import useTeamMember from '@/hooks/sidebar/useGetTeamMember';
import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import ValidataionMessage from '@/components/common/input/validationMessage';
import ModalLoading from '@/components/common/loading/modalLoading';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/inviteModal/inviteModal.style';

import Delcircle from '@/assets/icons/del_circle.svg?react';

type TInviteModalProps = {
  onClose: () => void;
  projectId?: number;
};

type TFormData = {
  email: string;
};
type TEmailList = {
  email: string;
}[];
export default function InviteModal({ onClose, projectId = 0 }: TInviteModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string | null | undefined>('');
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const email = useRef('');
  const emailValue = useWatch({ control, name: 'email' })?.trim() || '';
  const { useGetMemberEmail } = useProjectInfo({ projectId });
  const { useInvite } = useInviteMember();
  // const { useGetTeamMember } = useTeamMember({ projectId, email: email.current });
  const [memberEmailList, setMemberEmailList] = useState<TEmailList>([]);
  // const { data } = useGetTeamMember;
  const { data: memberEmail } = useGetMemberEmail;
  const { mutate: inviteMember, isPending } = useInvite;
  const [memberEmails, setMemberEmails] = useState<string[]>();
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (memberEmail?.result?.userEmails) {
      setMemberEmails(memberEmail.result.userEmails.map((a) => a.email));
    }
  }, [memberEmail]);
  useEffect(() => {
    if (emailValue && (error || emailErrorMsg)) {
      setError(false);
      setEmailErrorMsg(null);
    }
  }, [emailValue]);
  const handleAddEmail = () => {
    email.current = emailValue;
    let isDuplicate = emails.includes(email.current) || memberEmails?.includes(email.current);
    if (isDuplicate) {
      setError(true);
      setValue('email', '');
      isDuplicate = false;
      return;
    } else {
      setEmails((prev) => [...prev, email.current]);
      setMemberEmailList((prev) => [...prev, { email: email.current }]);
      setValue('email', '');
    }
  };
  const handleRemoveEmail = (remove: string) => {
    setMemberEmailList((prev) => prev.filter((e) => e.email !== remove));
    setEmails((prev) => prev.filter((e) => e !== remove));
  };
  const handleCreate = () => {
    inviteMember(
      {
        projectId: projectId,
        memberEmailList: memberEmailList,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectMember'] });
          setEmails([]);
          onClose();
        },
        onError: (err) => {
          setEmailErrorMsg(err.response?.data.message);
          setEmails([]);
        },
      },
    );
  };
  return (
    <>
      {isPending && <ModalLoading />}
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
              render={({ field }) => <Input placeholder="invite others by email" type="normal" {...field} errorMessage={errors.email?.message} />}
            />
            <Button type="act" color="blue" onClick={handleAddEmail} disabled={!emailValue.trim() || !!errors.email}>
              Share
            </Button>
          </S.BtnWrapper>
          {(emailErrorMsg || errors.email?.message) && (
            <ValidataionMessage message={errors.email?.message ?? emailErrorMsg ?? ''} isError={!!(emailErrorMsg || errors.email)} />
          )}
          {!errors.email?.message && error && <ValidataionMessage message={'The user is already added to the project.'} isError={!!error} />}
          <S.tagWrapper>
            {emails.map((e) => (
              <Button key={e} type="tag" color="mint" icon={<Delcircle />} iconPosition="right" onClick={() => handleRemoveEmail(e)}>
                {e}
              </Button>
            ))}
          </S.tagWrapper>
          <S.Position>
            <Button type="act" color="blue" onClick={handleCreate} disabled={emails.length === 0 || isPending}>
              Create
            </Button>
          </S.Position>
        </S.ModalBox>
      </Modal>
    </>
  );
}
