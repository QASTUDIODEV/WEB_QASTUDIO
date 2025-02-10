import { useDispatch } from 'react-redux';

import Modal from '@/components/common/modal/modal';

import * as S from './inviteErrorModal.style';

import { closeModal } from '@/slices/modalSlice';

export default function InviteSuccessModal() {
  const dispatch = useDispatch();

  return (
    <Modal
      title={'Invitation Accepted'}
      onClose={() => {
        dispatch(closeModal());
        localStorage.removeItem('inviteToken');
        localStorage.removeItem('InvitationResponse');
      }}
      isExitButtonVisible={true}
    >
      <S.Container>You have successfully accepted the invitation. Welcome, QASTUDIO!</S.Container>
    </Modal>
  );
}
