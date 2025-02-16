import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './deleteProjectModal.style';
import ValidataionMessage from '../../common/input/validationMessage';

type TAuthModalProps = {
  onClose: () => void;
};
export default function DeleteProjectModal({ onClose }: TAuthModalProps) {
  const { projectId } = useParams();
  const { useDeleteProject } = useProjectInfo({ projectId: Number(projectId) });
  const { mutate: deleteProjectMutate } = useDeleteProject;
  const [errorMessage, setErrorMessage] = useState('');
  const handleDelete = () => {
    deleteProjectMutate(
      { projectId: Number(projectId) },
      {
        onSuccess: () => {
          window.location.href = '/project';
        },
        onError: (error) => {
          setErrorMessage(error.response?.data.message || 'An error occurred.');
        },
      },
    );
  };
  return (
    <Modal title={'Are you sure you want to remove the page?'} onClose={onClose} isExitButtonVisible={false}>
      <S.Container>If you press the Remove button, it will never recover again and all data will be deleted.</S.Container>
      <S.ButtonBox>
        {errorMessage && <ValidataionMessage message={errorMessage} isError={true} />}
        <Button color={'white_square'} onClick={onClose}>
          Cancel
        </Button>
        <Button color={'blue'} onClick={handleDelete}>
          Delete
        </Button>
      </S.ButtonBox>
    </Modal>
  );
}
