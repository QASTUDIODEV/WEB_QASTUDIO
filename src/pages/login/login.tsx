import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/auth/authInput/authInput';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

type TValid = undefined | boolean;

export default function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState<TValid>(undefined);
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailValue)) {
      setIsValid(false);
      setMessage('Invalid email format');
    } else {
      setIsValid(undefined); // 이메일이 유효하면 isValid는 undefined로 설정
      setMessage('');
    }
  };

  // 비밀번호 입력값 변경 시 유효성 검사
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // 비밀번호 임시 조건: 8글자 이상
    if (passwordValue.length < 8) {
      setIsValid(false);
      setMessage(`Something's wrong`);
    } else if (email && email !== '' && password && password !== '') {
      setIsValid(true);
      setMessage('');
    } else if (passwordValue.length >= 8) {
      setIsValid(true);
      setMessage('');
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
          {message && (
            <S.MessageWrapper>
              <ValidataionMessage isError={true} message={message} />
            </S.MessageWrapper>
          )}

          <S.Wrapper>
            <span>Email</span>
            <AuthInput
              placeholder={'Email'}
              type="email"
              value={email}
              onChange={handleEmailChange} // 이메일 값 변경
              isValid={isValid} // 이메일 유효성 상태 전달
              autoComplete="email"
            />
          </S.Wrapper>
          <S.Wrapper>
            <span>Password</span>
            <AuthInput
              placeholder={'Password'}
              type="password"
              value={password}
              onChange={handlePasswordChange} // 비밀번호 값 변경
              isValid={isValid} // 비밀번호 유효성 상태 전달
              autoComplete="password"
            />
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
            backgroundColor: isValid ? '#0d409d' : '#a0a0a0',
            color: isValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
          disabled={!isValid}
        >
          Login
        </button>
        <OrDivider />
      </S.Container2>

      <SocialLogo />
      <S.Buttons>
        <S.Button>Finding Passwords</S.Button>
        <S.Button onClick={() => navigate('/signup')}>Sign up</S.Button>
      </S.Buttons>
    </S.Container>
  );
}
