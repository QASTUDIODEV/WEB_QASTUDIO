import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/mypage/failModal/failModal.style';

type TFailModalProps = {
  onClose: () => void;
};

export default function FailModal({ onClose }: TFailModalProps) {
  return (
    <Modal title="Failed to add" onClose={onClose} isExitButtonVisible={false}>
      <S.ModalBox>
        <S.Content> Email from an already existing account. Please log in separately to the account in that email.</S.Content>
        <S.BtnWrapper>
          <Button type="normal" color="blue" onClick={onClose}>
            Check
          </Button>
        </S.BtnWrapper>
      </S.ModalBox>
    </Modal>
  );
}
