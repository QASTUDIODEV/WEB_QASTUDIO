import * as S from '@/components/auth/validationMessage/validationMessage.style';

import Valid from '@/assets/icons/check_circle.svg?react';
import Wrong from '@/assets/icons/wrong.svg?react';

type TValidationMessage = {
  message: string;
  isError: boolean | undefined;
};
export default function ValidataionMessage({ message, isError }: TValidationMessage) {
  return (
    <>
      {isError === true && (
        <S.Container>
          <Wrong />
          <S.ErrorMessage>{message}</S.ErrorMessage>
        </S.Container>
      )}
      {isError === false && (
        <S.Container>
          <Valid />
          <S.TrueMessage>{message}</S.TrueMessage>
        </S.Container>
      )}
    </>
  );
}
