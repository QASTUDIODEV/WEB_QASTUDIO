import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/auth/input/AuthInput';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Container2>
        <S.Texts>
          <S.Title>Welcome to QASTUDIO !</S.Title>
          <S.Description>Login and enjoy QASTUDIO more.</S.Description>
        </S.Texts>
        <S.Form>
          <S.MessageWrapper>
            <ValidataionMessage isError={true} message={`Something's wrong`} />
          </S.MessageWrapper>
          <S.Wrapper>
            <span>Email</span>
            <AuthInput placeholder={'Email'} type="email" isValid={false} />
          </S.Wrapper>
          <S.Wrapper>
            <span>Password</span>
            <AuthInput placeholder={'Password'} type="password" isValid={false} />
          </S.Wrapper>
        </S.Form>
        {/* 임시 버튼 */}
        <button style={{ width: '100%', borderRadius: '4px', backgroundColor: '#0d409d', color: 'white', border: 'none', height: '40px' }}>Login</button>
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
