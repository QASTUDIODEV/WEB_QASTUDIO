import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/common/sidebar/projectModal/projectModal.style';

type TLogoutModalProps = {
  onClose: () => void; // 모달 닫기 함수
};

export default function LogoutModal({ onClose }: TLogoutModalProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    onClose();
  };
  return (
    <Modal title="Are you sure to log out?" onClose={onClose}>
      <S.ModalBox>
        <S.Position>
          <S.BtnWrapper>
            <Button type="normal" color="white_square" onClick={onClose}>
              No
            </Button>
            <Button type="normal" color="blue" onClick={handleLogout}>
              Yes
            </Button>
          </S.BtnWrapper>
        </S.Position>
      </S.ModalBox>
    </Modal>
  );
}
