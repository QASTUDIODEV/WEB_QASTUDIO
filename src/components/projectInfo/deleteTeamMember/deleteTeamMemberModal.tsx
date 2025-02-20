import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useChangeOwner } from '@/hooks/projectInfo/useChangeOwner';

import Button from '@/components/common/button/button';
import ValidationMessage from '@/components/common/input/validationMessage';
import ModalLoading from '@/components/common/loading/modalLoading';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/deleteTeamMember/deleteTeamMemberModal.style';

type TModalProps = {
  onClose: () => void;
  projectId?: number;
  email?: string;
};
export default function DeleteTeamMember({ onClose, projectId = 0, email = '' }: TModalProps) {
  const { useDeleteMember } = useChangeOwner();
  const queryClient = useQueryClient();
  const { mutate: deleteMember, isPending } = useDeleteMember;
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = () => {
    deleteMember(
      {
        projectId: projectId,
        email: email,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectMember', projectId] });
          onClose();
        },
        onError: (err) => {
          setErrorMessage(err.response?.data.message || 'An error occurred.');
        },
      },
    );
  };
  return (
    <Modal title="Are you sure to remove the team member?" onClose={onClose}>
      {isPending && <ModalLoading />}
      <S.ModalBox>
        <S.Content>If you press the Remove button, it will never recover again and all data will be deleted.</S.Content>
      </S.ModalBox>
      <S.BtnWrapper>
        {errorMessage && <ValidationMessage message={errorMessage} isError={true} />}
        <Button type="normal" color="white_square" onClick={onClose}>
          Cancel
        </Button>
        <Button type="normal" color="blue" onClick={handleChange} disabled={isPending}>
          Delete
        </Button>
      </S.BtnWrapper>
    </Modal>
  );
}
