import React from 'react';

import AuthButton from '@/components/auth/authButton/authButton';
import AuthInput from '@/components/auth/authInput/authInput';
import CodeInput from '@/components/auth/codeInput/codeInput';
import ValidationMessage from '@/components/auth/validationMessage/validationMessage';

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
};

type TCodeModuleProps = {
  touched: boolean | undefined;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  Name: string;
  codeVerify: boolean | undefined;
  handleVerifyCode: () => void;
  // ref: any;
};

// InputModule 컴포넌트
export const InputModule = React.forwardRef<HTMLInputElement, TModuleProps>(
  ({ btnName, touched, valid, errorMessage, span, inputname, Name, handleSendCode, top, ...rest }: TModuleProps, ref) => {
    return (
      <S.Wrapper>
        {span && <span>{span}</span>}
        <S.Wrapper2>
          <AuthInput
            placeholder={Name}
            type={inputname}
            autoComplete={inputname}
            isValid={touched ? valid : true}
            errorMessage={errorMessage}
            touched={touched}
            top={top}
            ref={ref}
            {...rest}
          />
          {btnName && (
            <S.ButtonWrapper>
              <AuthButton type="button" format="small" onClick={handleSendCode} disabled={!valid}>
                {btnName}
              </AuthButton>
            </S.ButtonWrapper>
          )}
        </S.Wrapper2>
      </S.Wrapper>
    );
  },
);

// CodeModule 컴포넌트
export const CodeModule = React.forwardRef<HTMLInputElement, TCodeModuleProps>(
  ({ touched, valid, errorMessage, Name, codeVerify, handleVerifyCode, ...rest }: TCodeModuleProps, ref) => {
    return (
      <S.Wrapper>
        <CodeInput placeholder={Name} isValid={touched ? (valid ? (codeVerify ? true : false) : false) : undefined} ref={ref} {...rest} />
        <S.MessageWrapper>
          {touched && errorMessage ? (
            <ValidationMessage message={errorMessage} isError={!valid} />
          ) : codeVerify ? (
            <ValidationMessage message={'Authentication completed'} isError={false} />
          ) : (
            codeVerify === false && <ValidationMessage message={'Invalid code.'} isError={true} />
          )}
        </S.MessageWrapper>
        <div style={{ position: 'absolute', right: '-90px' }}>
          <AuthButton valid={valid} type="button" format="code" onClick={handleVerifyCode} disabled={!valid} codeVerify={codeVerify}>
            Verify
          </AuthButton>
        </div>
      </S.Wrapper>
    );
  },
);
