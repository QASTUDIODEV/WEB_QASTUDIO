import { useNavigate } from 'react-router-dom';

import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Input from '@/components/common/input/input.tsx';

import Logo from '@/image/logo.svg';

import * as S from '@/pages/login/login.style.ts';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <img src={Logo} alt="" />
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
            <Input />
          </S.Wrapper>
          <S.Wrapper>
            <span>Password</span>
            <Input />
          </S.Wrapper>
        </S.Form>
        {/* 임시 버튼 */}
        <button>Login</button>
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
