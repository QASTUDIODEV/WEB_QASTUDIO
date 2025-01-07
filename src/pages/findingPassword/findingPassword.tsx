import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateCode, validateEmail, validatePassword, validateRepassword } from '@/utils/validate';

import AuthInput from '@/components/auth/authInput/authInput';
import CodeInput from '@/components/auth/codeInput/codeInput';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/findingPassword/findingPassword.style';

type TValid = undefined | boolean;

export default function FindingPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState<TValid>(undefined);
  const [codeMessage, setCodeMessage] = useState('');
  const [repassword, setRepassword] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState<TValid>(undefined);
  const [isRepasswordValid, setIsRepasswordValid] = useState<TValid>(undefined);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [repasswordMessage, setRepasswordMessage] = useState('');

  const [emailMessage, setEmailMessage] = useState('');

  const [isEmailValid, setIsEmailValid] = useState<TValid>(undefined);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailError = validateEmail(emailValue);
    setIsEmailValid(!emailError);
    setEmailMessage(emailError || '');
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const codeValue = e.target.value;
    setCode(codeValue);
    const codeError = validateCode(codeValue, '1234');
    setIsCodeValid(!codeError);
    setCodeMessage(codeError);
  };

  const handleVerify = () => {
    setStep(1);
    alert('해당 이메일로 인증 코드가 발송되었습니다');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const passwordError = validatePassword(passwordValue);
    setIsPasswordValid(!passwordError);
    setPasswordMessage(passwordError || '');
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repasswordValue = e.target.value;
    setRepassword(repasswordValue);
    const repasswordError = validateRepassword(password, repasswordValue);
    setIsRepasswordValid(!repasswordError);
    setRepasswordMessage(repasswordError || '');
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (userEmail: string, newPassword: string) => {
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && isEmailValid) {
        handleVerify();
      }
      if (step === 1 && isCodeValid) {
        setStep(2);
      }
      if (step === 2 && isPasswordValid && isRepasswordValid) {
        handleSubmit(email, password);
      }
    }
  };

  useEffect(() => {
    if (isCodeValid) {
      setStep(2);
    }
  }, [isCodeValid]);

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form onKeyDown={(e) => handleKeyDown(e)}>
        {step === 0 && (
          <>
            <S.Wrapper>
              <span>Email</span>
              <AuthInput placeholder={'Email'} type="email" value={email} onChange={handleEmailChange} autoComplete="email" isValid={isEmailValid} />
              {emailMessage && (
                <S.MessageWrapper>
                  <ValidataionMessage message={emailMessage} isError={!isEmailValid} />
                </S.MessageWrapper>
              )}
            </S.Wrapper>
            <button
              onClick={handleVerify}
              type="button"
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isEmailValid ? '#0d409d' : '#a0a0a0',
                color: isEmailValid ? 'white' : '#d3d3d3',
                cursor: isEmailValid ? 'pointer' : 'not-allowed',
              }}
              disabled={!isEmailValid}
            >
              Verify
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <S.Wrapper>
              <span>Email</span>
              <AuthInput placeholder={'Email'} type="email" value={email} onChange={handleEmailChange} autoComplete="email" isValid={isEmailValid} />
            </S.Wrapper>
            <S.Wrapper>
              <CodeInput placeholder={'Code'} value={code} onChange={handleCodeChange} />
            </S.Wrapper>
            {codeMessage && (
              <S.MessageWrapper>
                <ValidataionMessage message={codeMessage} isError={!isCodeValid} />
              </S.MessageWrapper>
            )}
            <button
              type="button"
              onClick={handleVerify}
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isEmailValid ? '#0d409d' : '#a0a0a0',
                color: isEmailValid ? 'white' : '#d3d3d3',
                cursor: isEmailValid ? 'pointer' : 'not-allowed',
              }}
              disabled={!isEmailValid}
            >
              Resend code
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <S.Wrapper>
              <span>New Password</span>
              <AuthInput
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="password"
                isValid={isPasswordValid}
              />
              {passwordMessage && (
                <S.MessageWrapper>
                  <ValidataionMessage message={passwordMessage} isError={!isPasswordValid} />
                </S.MessageWrapper>
              )}
            </S.Wrapper>
            <S.Wrapper>
              <span>Password</span>
              <AuthInput
                placeholder="Re-enter Password"
                type="password"
                value={repassword}
                onChange={handleRePasswordChange}
                autoComplete="password"
                isValid={isRepasswordValid}
              />
              {repasswordMessage && (
                <S.MessageWrapper>
                  <ValidataionMessage message={repasswordMessage} isError={!isRepasswordValid} />
                </S.MessageWrapper>
              )}
            </S.Wrapper>

            <button
              onClick={() => handleSubmit(email, password)}
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isPasswordValid && isRepasswordValid ? '#0d409d' : '#a0a0a0',
                color: isPasswordValid && isRepasswordValid ? 'white' : '#d3d3d3',
                cursor: isPasswordValid && isRepasswordValid ? 'pointer' : 'not-allowed',
              }}
              disabled={!isPasswordValid || !isRepasswordValid}
            >
              Go to the login
            </button>
          </>
        )}
      </S.Form>

      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </S.Container>
  );
}
