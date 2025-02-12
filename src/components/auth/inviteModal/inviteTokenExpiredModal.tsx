import { useDispatch } from 'react-redux';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './inviteModal.style';

import { closeModal } from '@/slices/modalSlice';

type TAuthModalProps = {
  onClose: () => void;
};

export default function InviteTokenExpiredModal({ onClose }: TAuthModalProps) {
  const dispatch = useDispatch();
  return (
    <Modal title={'Invitation Expired'} onClose={onClose} isExitButtonVisible={false}>
      <S.Container>This invitation link has expired. Please request a new invitation if needed.</S.Container>
      <S.ButtonBox>
        <Button
          color="blue"
          onClick={() => {
            dispatch(closeModal());
            localStorage.removeItem('inviteToken');
            localStorage.removeItem('InvitationResponse');
          }}
        >
          Go Back
        </Button>
      </S.ButtonBox>
    </Modal>
  );
}
