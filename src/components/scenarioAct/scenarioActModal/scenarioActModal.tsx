import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import Modal from '@/components/common/modal/modal';
import * as S from '@/components/scenarioAct/scenarioActModal/scenarioActModal.style';

import { closeModal } from '@/slices/modalSlice.ts';

export default function ScenarioActModal() {
  const dispatch = useDispatch();

  const res = {
    title: 'UMC_PM_DAY',
    code: 404,
    message: '404',
  };

  return (
    <Modal title={res.title} onClose={() => dispatch(closeModal())}>
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
          </S.ResultWrapper>
        </S.ResultContainer>
      </S.Container>
    </Modal>
  );
}
