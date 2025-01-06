import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateEmail, validatePassword, validateRepassword } from '@/utils/validate';

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

  const [isEmailValid, setIsEmailValid] = useState<TValid>(undefined);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailError = validateEmail(emailValue);

    setIsEmailValid(!emailError);
  };

  // 코드 실시간 검증
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const codeValue = e.target.value;
    setCode(codeValue);

    if (codeValue === '1234') {
      setIsCodeValid(true);
      setCodeMessage('Authentication completed');
    } else {
      setIsCodeValid(false);
      setCodeMessage('The code is not correct');
    }
  };

  // 비밀번호 입력 변경
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
    setPasswordMessage(repasswordError || '');
  };

  // 마지막 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };
  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form>
        {step === 0 && (
          <>
            <S.Wrapper>
              <span>Email</span>
              <AuthInput
                placeholder={'Email'}
                type="email"
                value={email}
                onChange={handleEmailChange} // 이메일 값 변경
                autoComplete="email"
              />
            </S.Wrapper>
            <button
              onClick={() => setStep(1)}
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isEmailValid ? '#0d409d' : '#a0a0a0',
                color: isEmailValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
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
              <AuthInput
                placeholder={'Email'}
                type="email"
                value={email}
                onChange={handleEmailChange} // 이메일 값 변경
                autoComplete="email"
              />
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
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isEmailValid ? '#0d409d' : '#a0a0a0',
                color: isEmailValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
                cursor: isEmailValid ? 'pointer' : 'not-allowed',
              }}
              disabled={!isEmailValid}
            >
              Sign up
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
            </S.Wrapper>
            {passwordMessage && (
              <S.MessageWrapper>
                <ValidataionMessage message={passwordMessage} isError={!isEmailValid || !isPasswordValid || !isRepasswordValid} />
              </S.MessageWrapper>
            )}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                borderRadius: '4px',
                border: 'none',
                height: '40px',
                backgroundColor: isPasswordValid && isRepasswordValid ? '#0d409d' : '#a0a0a0',
                color: isPasswordValid && isRepasswordValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
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
