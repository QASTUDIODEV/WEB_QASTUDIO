import React from 'react';
import { useNavigate } from 'react-router-dom';

import { validateLogin } from '@/utils/validate';

import useForm from '@/hooks/auth/useForm';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

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
          <InputModule
            name="email"
            Name="Email"
            span="Email"
            top={true}
            touched={login.touched.email}
            valid={login.valid.email}
            errorMessage={login.errors.email}
            {...login.getTextInputProps('email')}
          />

          <InputModule
            name="password"
            Name="Password"
            span="Password"
            top={false}
            touched={login.touched.password}
            valid={login.valid.password}
            errorMessage={login.errors.password}
            {...login.getTextInputProps('password')}
          />
        </S.Form>
        {/* 임시 버튼 */}
        <AuthButton format="normal" disabled={!login.valid.email || !login.valid.password} type={'submit'}>
          Login
        </AuthButton>

        <OrDivider />
      </S.Container2>

      <SocialLogo gap={20} size="large" />
      <S.Buttons>
        <S.Button onClick={() => navigate('/finding')}>Finding Passwords</S.Button>
        <S.Button onClick={() => navigate('/signup')}>Sign up</S.Button>
      </S.Buttons>
    </S.Container>
  );
}
