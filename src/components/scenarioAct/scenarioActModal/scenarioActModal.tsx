import useGetError from '@/hooks/error/useGetError';

import Modal from '@/components/common/modal/modal';

import * as S from './scenarioActModal.style';

type TErrorProps = {
  onClose: () => void;
  testId?: number;
};

export default function scenarioActModal({ onClose, testId = 0 }: TErrorProps) {
  const { data } = useGetError({ testId });

  return (
    <Modal title={data?.result.testName} onClose={onClose}>
      <S.Container>
        <p>Screen Shot</p>
        <S.ResultContainer>
          <S.ScreenShotWrapper>{data?.result.errorImage ? <img src={data?.result.errorImage} alt={'error image'} /> : <S.ScreenShotBox />}</S.ScreenShotWrapper>
          <S.ResultWrapper>
            <S.ErrorWrapper>
              <p>Error Code</p>
              <S.ResultBox>{data?.result.errorCode}</S.ResultBox>
            </S.ErrorWrapper>
            <S.ErrorWrapper>
              <p>Error Message</p>
              <S.MessageBox>{data?.result.errorMessage}</S.MessageBox>
            </S.ErrorWrapper>
            <S.ButtonBox />
          </S.ResultWrapper>
        </S.ResultContainer>
      </S.Container>
    </Modal>
  );
}
