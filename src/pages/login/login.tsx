import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateEmail, validatePassword } from '@/utils/validate';

import AuthInput from '@/components/auth/authInput/authInput';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

type TValid = undefined | boolean;

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isEmailValid, setIsEmailValid] = useState<TValid>(undefined);
  const [isPasswordValid, setIsPasswordValid] = useState<TValid>(undefined);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 추후 추가 예정
  };

  // 이메일 입력값 변경 시 유효성 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailError = validateEmail(emailValue);

    if (!emailError) {
      setIsEmailValid(true);
      setEmailMessage('');
    } else {
      setIsEmailValid(false);
      setEmailMessage(`Something's wrong!`);
    }
  };

  // 비밀번호 입력값 변경 시 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const passwordError = validatePassword(passwordValue);
    // 비밀번호 임시 조건: 8글자 이상
    if (!passwordError) {
      setIsPasswordValid(true);
      setPasswordMessage('');
    } else {
      setIsPasswordValid(false);
      setPasswordMessage(`Something's wrong!`);
    }
  };

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Container2>
        <S.Texts>
          <S.Title>Welcome to QASTUDIO !</S.Title>
          <S.Description>Login and enjoy QASTUDIO more.</S.Description>
        </S.Texts>
        <S.Form onSubmit={handleSubmit}>
          {/* 유효성 검사에 따라 메시지 출력 */}

          <S.Wrapper>
            <span>Email</span>
            <AuthInput
              placeholder={'Email'}
              type="email"
              value={email}
              onChange={handleEmailChange} // 이메일 값 변경
              isValid={isEmailValid && isPasswordValid} // 이메일 유효성 상태 전달
              autoComplete="email"
            />
            {emailMessage && (
              <S.MessageWrapper>
                <ValidataionMessage isError={true} message={emailMessage} />
              </S.MessageWrapper>
            )}
          </S.Wrapper>
          <S.Wrapper>
            <span>Password</span>
            <AuthInput
              placeholder={'Password'}
              type="password"
              value={password}
              onChange={handlePasswordChange} // 비밀번호 값 변경
              isValid={isPasswordValid && isEmailValid} // 비밀번호 유효성 상태 전달
              autoComplete="password"
            />
            {passwordMessage && (
              <S.MessageWrapper>
                <ValidataionMessage isError={true} message={passwordMessage} />
              </S.MessageWrapper>
            )}
          </S.Wrapper>
        </S.Form>
        {/* 임시 버튼 */}
        <button
          type="submit"
          style={{
            width: '100%',
            borderRadius: '4px',
            border: 'none',
            height: '40px',
            backgroundColor: isEmailValid && isPasswordValid ? '#0d409d' : '#a0a0a0',
            color: isEmailValid && isPasswordValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
            cursor: isEmailValid && isPasswordValid ? 'pointer' : 'not-allowed',
          }}
          disabled={!isEmailValid || !isPasswordValid}
        >
          Login
        </button>
        <OrDivider />
      </S.Container2>

      <SocialLogo />
      <S.Buttons>
        <S.Button onClick={() => navigate('/finding')}>Finding Passwords</S.Button>
        <S.Button onClick={() => navigate('/signup')}>Sign up</S.Button>
      </S.Buttons>
    </S.Container>
  );
}
