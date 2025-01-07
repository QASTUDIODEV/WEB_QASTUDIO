import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateLogin } from '@/utils/validate';

import useForm from '@/hooks/auth/useForm';

import { ErrorDownModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

type TValid = undefined | boolean;

export default function LoginPage() {
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
      repassword: '',
      code: '',
      nickname: '',
      authCode: '',
    },
    validate: validateLogin,
  });
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isEmailValid, setIsEmailValid] = useState<TValid>(undefined);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isPasswordValid, setIsPasswordValid] = useState<TValid>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 추후 추가 예정
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
          <ErrorDownModule
            name="email"
            Name="Email"
            span="Email"
            btnName="Send"
            touched={login.touched.email}
            valid={login.valid.email}
            errorMessage={login.errors.email}
            {...login.getTextInputProps('email')}
          />

          <ErrorDownModule
            name="password"
            Name="Password"
            span="Password"
            touched={login.touched.password}
            valid={login.valid.password}
            errorMessage={login.errors.password}
            {...login.getTextInputProps('password')}
          />
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
