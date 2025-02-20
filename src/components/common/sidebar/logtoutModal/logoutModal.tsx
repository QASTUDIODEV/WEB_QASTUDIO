import useUserAuth from '@/hooks/auth/useUserAuth';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';
import * as S from '@/components/common/sidebar/logtoutModal/logoutModal.style';

import ModalLoading from '../../loading/modalLoading';

type TLogoutModalProps = {
  onClose: () => void;
};

export default function LogoutModal({ onClose }: TLogoutModalProps) {
  const { useLogout } = useUserAuth();
  const { mutate: logoutMutate, isPending } = useLogout;
  const handleLogout = () => {
    logoutMutate(
      {},
      {
        onSuccess: () => {
          window.location.replace('/');
          onClose();
        },
        onError: () => {
          window.location.replace('/');
          onClose();
        },
      },
    );
  };

  return (
    <Modal title="Are you sure you want to log out?" onClose={onClose}>
      {isPending && <ModalLoading />}
      <S.ModalBox>
        <S.BtnWrapper>
          <Button type="normal" color="white_square" onClick={onClose} disabled={isPending}>
            No
          </Button>
          <Button type="normal" color="blue" onClick={handleLogout} disabled={isPending}>
            Yes
          </Button>
        </S.BtnWrapper>
      </S.ModalBox>
    </Modal>
  );
}
