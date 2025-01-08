import * as S from './module.style';
import AuthButton from '../authButton/authButton';
import AuthInput from '../authInput/authInput';
import CodeInput from '../codeInput/codeInput';
import ValidataionMessage from '../validationMessage/validationMessage';

type TModuleProps = {
  btnName?: string;
  touched: boolean | undefined;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  handleSendCode?: () => void;
  span?: string;
  Name: string;
  name: string;
};

type TCodeModuleProps = {
  touched: boolean | undefined;
  valid: boolean | undefined;
  errorMessage: string | undefined;
  handleSendCode?: () => void;
  span?: string;
  Name: string;
  name: string;
  codeVerify: boolean | undefined;
  handleVerifyCode: () => void;
};

export function ErrorTopModule({ btnName, touched, valid, errorMessage, span, name, Name, handleSendCode, ...rest }: TModuleProps) {
  return (
    <S.Wrapper>
      {span && <span>{span}</span>}
      <S.Wrapper2>
        <AuthInput placeholder={Name} type={name} autoComplete={name} isValid={touched ? valid : true} {...rest} />
        {btnName && (
          <div style={{ position: 'absolute', right: '-90px', top: '0' }}>
            <AuthButton type="button" format="small" onClick={handleSendCode} disabled={!valid}>
              {btnName}
            </AuthButton>
          </div>
        )}
      </S.Wrapper2>

      {errorMessage && touched && (
        <S.MessageWrapper2>
          <ValidataionMessage message={errorMessage} isError={!valid} />
        </S.MessageWrapper2>
      )}
    </S.Wrapper>
  );
}

export function ErrorDownModule({ touched, valid, errorMessage, span, name, Name, ...rest }: TModuleProps) {
  return (
    <S.Wrapper>
      <span>{span}</span>
      <AuthInput placeholder={Name} type={name} autoComplete={name} isValid={touched ? valid : true} {...rest} />
      {errorMessage && touched && (
        <S.MessageWrapper>
          <ValidataionMessage message={errorMessage} isError={!valid} />
        </S.MessageWrapper>
      )}
    </S.Wrapper>
  );
}

export function CodeModule({ touched, valid, errorMessage, Name, codeVerify, handleVerifyCode, ...rest }: TCodeModuleProps) {
  return (
    <S.Wrapper>
      <CodeInput placeholder={Name} isValid={touched ? (valid ? (codeVerify ? true : false) : false) : undefined} {...rest} />
      <S.MessageWrapper>
        {touched && errorMessage ? (
          <ValidataionMessage message={errorMessage} isError={!valid} />
        ) : codeVerify ? (
          <ValidataionMessage message={'Authentication completed'} isError={false} />
        ) : (
          codeVerify === false && <ValidataionMessage message={'Invalid code.'} isError={true} />
        )}
      </S.MessageWrapper>
      <div style={{ position: 'absolute', right: '-90px' }}>
        <AuthButton valid={valid} type="button" format="code" onClick={handleVerifyCode} disabled={!valid} codeVerify={codeVerify}>
          Verify
        </AuthButton>
      </div>
    </S.Wrapper>
  );
}
