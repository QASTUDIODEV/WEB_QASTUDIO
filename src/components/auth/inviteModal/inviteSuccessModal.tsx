import Modal from '@/components/common/modal/modal';

import * as S from './inviteErrorModal.style';

type TAuthModalProps = {
  onClose: () => void;
};
export default function InviteSuccessModal({ onClose }: TAuthModalProps) {
  return (
    <Modal title={'Invitation Accepted'} onClose={onClose} isExitButtonVisible={true}>
      <S.Container>You have successfully accepted the invitation. Welcome, QASTUDIO!</S.Container>
    </Modal>
  );
}
