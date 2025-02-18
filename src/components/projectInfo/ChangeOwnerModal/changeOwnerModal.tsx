import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/ChangeOwnerModal/changeOwnerModal.style';

type TModalProps = {
  onClose: () => void;
};
export default function ChangeOwnerModal({ onClose }: TModalProps) {
  return (
    <Modal title="Do you want to delegate the room manager authority?" onClose={onClose}>
      <S.ModalBox>
        <S.Content>As soon as you lose the room manager authority, you lose the right to modify or remove the project.</S.Content>
        <S.BtnWrapper>
          <Button type="normal" color="white_square" onClick={onClose}>
            Cancel
          </Button>
          <Button type="normal" color="blue" onClick={onClose}>
            Delegrate
          </Button>
        </S.BtnWrapper>
      </S.ModalBox>
    </Modal>
  );
}
