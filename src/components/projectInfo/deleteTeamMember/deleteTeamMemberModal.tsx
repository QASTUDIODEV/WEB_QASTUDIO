import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/projectInfo/deleteTeamMember/deleteTeamMemberModal.style';

type TModalProps = {
  onClose: () => void;
};
export default function DeleteTeamMember({ onClose }: TModalProps) {
  return (
    <Modal title="Are you sure to remove the team member?" onClose={onClose}>
      <S.ModalBox>
        <S.Content>If you press the Remove button, it will never recover again and all data will be deleted.</S.Content>
        <S.BtnWrapper>
          <Button type="normal" color="white_square" onClick={onClose}>
            Cancel
          </Button>
          <Button type="normal" color="blue" onClick={onClose}>
            Delete
          </Button>
        </S.BtnWrapper>
      </S.ModalBox>
    </Modal>
  );
}
