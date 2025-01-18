import { useDispatch } from 'react-redux';

import Button from '@/components/common/button/button';
import Modal from '@/components/common/modal/modal';

import * as S from './errorModal.style';

import { setOpen } from '@/slices/modalSlice';

export default function ErrorModal() {
  const dispatch = useDispatch();

  return (
    <Modal title={'UMC_PM_DAY'} onClose={() => dispatch(setOpen())}>
      <S.Container>
        <p>Screen Shot</p>
        <S.ResultContainer>
          <S.ScreenShotWrapper>
            <S.ScreenShotBox />
          </S.ScreenShotWrapper>
          <S.ResultWrapper>
            <S.ErrorWrapper>
              <p>Error Code</p>
              <S.ResultBox>404</S.ResultBox>
            </S.ErrorWrapper>
            <S.ErrorWrapper>
              <p>Error Message</p>
              <S.MessageBox>404</S.MessageBox>
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
