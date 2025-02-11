import { useDispatch } from 'react-redux';

import Modal from '@/components/common/modal/modal';

import * as S from './inviteErrorModal.style';

import { closeModal } from '@/slices/modalSlice';

export default function InviteTokenExpiredModal() {
  const dispatch = useDispatch();
  return (
    <Modal
      title={'Invite Token Expired'}
      onClose={() => {
        dispatch(closeModal());
        localStorage.removeItem('InvitationResponse');
        localStorage.removeItem('inviteToken');
      }}
      isExitButtonVisible={true}
    >
      <S.Container>Token is Expired.</S.Container>
    </Modal>
  );
}
