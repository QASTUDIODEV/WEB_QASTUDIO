import React from 'react';

import AuthButton from '@/components/auth/authButton/authButton';
import CodeInput from '@/components/auth/codeInput/codeInput';
import Input from '@/components/common/input/input';
import ValidationMessage from '@/components/common/input/validationMessage';
import LoadingSpinner from '@/components/common/loading/loadingSpinner';

import * as S from './module.style';

import CheckCircle from '@/assets/icons/check_circle_pri50.svg?react';

type TModuleProps = {
  btnName?: string;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  handleSendCode?: () => void;
  span?: string;
  Name: string;
  inputname: string;
  top: boolean;
  pending?: boolean;
  value?: string;
  isUndefined?: boolean;
  success?: boolean;
};

type TCodeModuleProps = {
  valid: boolean | undefined;
  errorMessage: string | undefined;
  Name: string;
  codeverify: boolean | undefined;
  handleVerifyCode: () => void;
};

// InputModule 컴포넌트
export const InputModule = React.forwardRef<HTMLInputElement, TModuleProps>(
  ({ btnName, valid, errorMessage, value, span, inputname, Name, isUndefined, success, handleSendCode, top, pending, ...rest }: TModuleProps, ref) => {
    return (
      <S.Wrapper>
        {span && <span>{span}</span>}
        {pending && !!btnName && (
          <S.LoadingWrapper>
            <LoadingSpinner />
          </S.LoadingWrapper>
        )}
        {success && !!btnName && (
          <S.LoadingWrapper>
            <CheckCircle />
          </S.LoadingWrapper>
        )}
        <S.Wrapper2>
          <Input
            placeholder={Name}
            type={inputname}
            autoComplete={inputname}
            isValid={valid}
            errorMessage={errorMessage}
            value={value}
            top={top}
            ref={ref}
            {...rest}
          />
          {btnName && (
            <S.ButtonWrapper>
              <AuthButton type="button" format="small" onClick={handleSendCode} disabled={!valid || pending || isUndefined}>
                {btnName}
              </AuthButton>
            </S.ButtonWrapper>
          )}
          {errorMessage && top && (
            <S.MessageWrapper>
              <ValidationMessage message={errorMessage} isError={!valid} />
            </S.MessageWrapper>
          )}
        </S.Wrapper2>
        {errorMessage && !top && (
          <S.MessageWrapper3>
            <ValidationMessage message={errorMessage} isError={!valid} />
          </S.MessageWrapper3>
        )}
      </S.Wrapper>
    );
  },
);

// CodeModule 컴포넌트
export const CodeModule = React.forwardRef<HTMLInputElement, TCodeModuleProps>(
  ({ valid, errorMessage, Name, codeverify, handleVerifyCode, ...rest }: TCodeModuleProps, ref) => {
    return (
      <S.Wrapper>
        <CodeInput placeholder={Name} isValid={valid ? (codeverify ? true : false) : false} ref={ref} {...rest} />
        <S.MessageWrapper2>
          {errorMessage ? (
            <ValidationMessage message={errorMessage} isError={!valid} />
          ) : codeverify ? (
            <ValidationMessage message={'Authentication completed'} isError={false} />
          ) : (
            codeverify === false && <ValidationMessage message={'Invalid code.'} isError={true} />
          )}
        </S.MessageWrapper2>
        <S.AuthButtonWrapper>
          <AuthButton valid={valid} type="button" format="code" onClick={handleVerifyCode} disabled={!valid} codeverify={codeverify}>
            Verify
          </AuthButton>
        </S.AuthButtonWrapper>
      </S.Wrapper>
    );
  },
);
