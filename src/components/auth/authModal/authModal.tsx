import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './authModal.style';

type TAuthModalProps = {
  onClose: () => void;
};
export default function AuthModal({ onClose }: TAuthModalProps) {
  const navigate = useNavigate();
  return (
    <Modal title={'Login is required'} onClose={onClose} isExitButtonVisible={false}>
      <S.Container>Do you want me to go to login?</S.Container>
      <S.ButtonBox>
        <Button color={'white_square'} onClick={() => navigate('/')}>
          No
        </Button>
        <Button color={'blue'} onClick={() => navigate('/')}>
          Yes
        </Button>
      </S.ButtonBox>
    </Modal>
  );
}
