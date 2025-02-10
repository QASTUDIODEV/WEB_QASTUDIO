import Modal from '@/components/common/modal/modal';

import * as S from './inviteModal.style';

type TAuthModalProps = {
  onClose: () => void;
};
export default function InviteErrorModal({ onClose }: TAuthModalProps) {
  return (
    <Modal title={'Email Mismatch'} onClose={onClose} isExitButtonVisible={true}>
      <S.Container>This invitation was sent to a different email. Please check the correct one.</S.Container>
    </Modal>
  );
}
