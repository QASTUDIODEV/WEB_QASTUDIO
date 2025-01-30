import React from 'react';

import AuthButton from '@/components/auth/authButton/authButton';
import CodeInput from '@/components/auth/codeInput/codeInput';
import Input from '@/components/common/input/input';
import ValidationMessage from '@/components/common/input/validationMessage';

import * as S from './module.style';

type TModuleProps = {
  btnName?: string;
  touched: boolean | undefined;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  handleSendCode?: () => void;
  span?: string;
  Name: string;
  inputname: string;
  top: boolean;
  pending?: boolean;
  value?: string;
};

type TCodeModuleProps = {
  touched: boolean | undefined;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  Name: string;
  codeverify: boolean | undefined;
  handleVerifyCode: () => void;
};

// InputModule 컴포넌트
export const InputModule = React.forwardRef<HTMLInputElement, TModuleProps>(
  ({ btnName, touched, valid, errorMessage, value, span, inputname, Name, handleSendCode, top, pending, ...rest }: TModuleProps, ref) => {
    return (
      <S.Wrapper>
        {span && <span>{span}</span>}
        <S.Wrapper2>
          <Input
            placeholder={Name}
            type={inputname}
            autoComplete={inputname}
            isValid={touched ? valid : true}
            errorMessage={errorMessage}
            touched={touched}
            value={value}
            top={top}
            ref={ref}
            {...rest}
          />
          {btnName && (
            <S.ButtonWrapper>
              <AuthButton type="button" format="small" onClick={handleSendCode} disabled={!valid || pending}>
                {btnName}
              </AuthButton>
            </S.ButtonWrapper>
          )}
          {errorMessage && touched && top && inputname === 'normal' && (
            <S.MessageWrapper>
              <ValidationMessage message={errorMessage} isError={!valid} />
            </S.MessageWrapper>
          )}
        </S.Wrapper2>
      </S.Wrapper>
    );
  },
);

// CodeModule 컴포넌트
export const CodeModule = React.forwardRef<HTMLInputElement, TCodeModuleProps>(
  ({ touched, valid, errorMessage, Name, codeverify, handleVerifyCode, ...rest }: TCodeModuleProps, ref) => {
    return (
      <S.Wrapper>
        <CodeInput placeholder={Name} isValid={touched ? (valid ? (codeverify ? true : false) : false) : undefined} ref={ref} {...rest} />
        <S.MessageWrapper2>
          {touched && errorMessage ? (
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
