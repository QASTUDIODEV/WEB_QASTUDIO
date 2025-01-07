import * as S from './module.style';
import AuthInput from '../authInput/authInput';
import CodeInput from '../codeInput/codeInput';
import ValidataionMessage from '../validationMessage/validationMessage';

const buttonStyles = (enabled: boolean | undefined) => ({
  width: '100%',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: enabled ? '#0d409d' : '#a0a0a0',
  color: enabled ? 'white' : '#d3d3d3',
  cursor: enabled ? 'pointer' : 'not-allowed',
  height: '40px',
});

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
      <AuthInput placeholder={Name} type={name} autoComplete={name} isValid={touched ? valid : true} {...rest} />
      {btnName && (
        <div style={{ width: '80px', position: 'absolute', top: '25px', right: '-90px' }}>
          <button type="button" style={buttonStyles(valid && touched)} onClick={handleSendCode} disabled={!valid}>
            {btnName}
          </button>
        </div>
      )}
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
      <button
        type="button"
        style={{
          position: 'absolute',
          right: '-90px',
          width: '79px',
          padding: '0px 10px',
          backgroundColor: valid ? (codeVerify ? '#007f7f' : '#0d409d') : '#a0a0a0',
          color: valid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
          cursor: valid ? (codeVerify ? 'not-allowed' : 'pointer') : 'not-allowed',
          border: 'none',
          borderRadius: '4px',
          height: '41px',
        }}
        onClick={handleVerifyCode}
        disabled={!valid}
      >
        Verify
      </button>
    </S.Wrapper>
  );
}
