import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useChangeOwner } from '@/hooks/projectInfo/useChangeOwner';

import Button from '@/components/common/button/button';
import ValidationMessage from '@/components/common/input/validationMessage';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/ChangeOwnerModal/changeOwnerModal.style';

type TModalProps = {
  onClose: () => void;
  projectId?: number;
  userId?: number;
};
export default function ChangeOwnerModal({ onClose, projectId = 0, userId = 0 }: TModalProps) {
  const { useChangeOwn } = useChangeOwner();
  const queryClient = useQueryClient();
  const { mutate: changeOwner } = useChangeOwn;
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = () => {
    changeOwner(
      {
        projectId: projectId,
        userId: userId,
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
    <Modal title="Do you want to delegate the room manager authority?" onClose={onClose}>
      <S.ModalBox>
        <S.Content>As soon as you lose the room manager authority, you lose the right to modify or remove the project.</S.Content>
        <S.BtnWrapper>
          {errorMessage && <ValidationMessage message={errorMessage} isError={true} />}
          <Button type="normal" color="white_square" onClick={onClose}>
            Cancel
          </Button>
          <Button type="normal" color="blue" onClick={handleChange}>
            Delegrate
          </Button>
        </S.BtnWrapper>
      </S.ModalBox>
    </Modal>
  );
}
