import { useDispatch } from 'react-redux';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './inviteModal.style';

import { closeModal } from '@/slices/modalSlice';

type TAuthModalProps = {
  onClose: () => void;
};

export default function InviteSuccessModal({ onClose }: TAuthModalProps) {
  const dispatch = useDispatch();

  return (
    <Modal title={'Invitation Accepted'} onClose={onClose} isExitButtonVisible={false}>
      <S.Container>You have successfully accepted the invitation. Welcome aboard!</S.Container>
      <S.ButtonBox>
        <Button
          color="blue"
          onClick={() => {
            dispatch(closeModal());
            localStorage.removeItem('inviteToken');
            localStorage.removeItem('InvitationResponse');
          }}
        >
          Continue
        </Button>
      </S.ButtonBox>
    </Modal>
  );
}
