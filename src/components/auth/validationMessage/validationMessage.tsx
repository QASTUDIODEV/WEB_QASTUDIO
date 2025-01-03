import * as S from '@/components/auth/validationMessage/validationMessage.style';

import Valid from '@/image/valid.svg';
import Wrong from '@/image/wrong.svg';

type TValidationMessage = {
  message: string;
  isError: boolean;
};
export default function ValidataionMessage({ message, isError }: TValidationMessage) {
  return (
    <>
      {isError ? (
        <S.Container>
          <img src={Wrong} />
          <S.ErrorMessage>{message}</S.ErrorMessage>
        </S.Container>
      ) : (
        <S.Container>
          <img src={Valid} />
          <S.TrueMessage>{message}</S.TrueMessage>
        </S.Container>
      )}
    </>
  );
}
