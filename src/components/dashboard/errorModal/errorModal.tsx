import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './errorModal.style';

const res = {
  title: 'UMC_PM_DAY',
  code: 404,
  message: '404',
};

type TErrorProps = {
  onClose: () => void;
};

export default function ErrorModal({ onClose }: TErrorProps) {
  return (
    <Modal title={res.title} onClose={onClose}>
      <S.Container>
        <p>Screen Shot</p>
        <S.ResultContainer>
          <S.ScreenShotWrapper>
            <S.ScreenShotBox />
          </S.ScreenShotWrapper>
          <S.ResultWrapper>
            <S.ErrorWrapper>
              <p>Error Code</p>
              <S.ResultBox>{res.code}</S.ResultBox>
            </S.ErrorWrapper>
            <S.ErrorWrapper>
              <p>Error Message</p>
              <S.MessageBox>{res.message}</S.MessageBox>
            </S.ErrorWrapper>
            <S.ButtonBox>
              <Button color={'blue'} onClick={() => {}}>
                Replay
              </Button>
            </S.ButtonBox>
          </S.ResultWrapper>
        </S.ResultContainer>
      </S.Container>
    </Modal>
  );
}
