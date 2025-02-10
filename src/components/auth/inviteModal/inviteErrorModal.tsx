import { useDispatch } from 'react-redux';

import Modal from '@/components/common/modal/modal';

import * as S from './inviteErrorModal.style';

import { closeModal } from '@/slices/modalSlice';

export default function InviteErrorModal() {
  const dispatch = useDispatch();
  return (
    <Modal
      title={'Email Mismatch'}
      onClose={() => {
        dispatch(closeModal());
        localStorage.removeItem('InvitationResponse');
      }}
      isExitButtonVisible={true}
    >
      <S.Container>This invitation was sent to a different email. Please check the correct one.</S.Container>
    </Modal>
  );
}
