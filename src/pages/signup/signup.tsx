import { useState } from 'react';

import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import Input from '@/components/common/input/input.tsx';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/image/arrow_left.svg';
import defaultProfile from '@/image/defaultProfile.svg';
import Logo from '@/image/logo.svg';
import ProfileEdit from '@/image/profileEdit.svg';

import * as S from '@/pages/signup/signup.style';

export default function SignupPage() {
  const [step, setStep] = useState(0);
  return (
    <S.Container>
      <img src={Logo} alt="" />
      {step === 0 && (
        <>
          <S.Form>
            <S.Wrapper>
              <span>Email</span>
              <Input />
              {/* 임시 버튼 */}
              <button style={{ position: 'absolute', right: '-50px', top: '25px' }}>Verify</button>
            </S.Wrapper>

            <S.Wrapper>
              <Input />
            </S.Wrapper>

            <S.Wrapper>
              <span>Password</span>
              <Input />
            </S.Wrapper>
            {/* 임시 버튼 */}
            <button onClick={() => setStep(1)}>Sign up</button>
          </S.Form>

          <OrDivider />
          <SocialLogo />
          <S.BackButton>
            <img src={ArrowLeft} />
            Back
          </S.BackButton>
        </>
      )}
      {step === 1 && (
        <>
          <S.ProfileImg>
            <Profile profileImg={defaultProfile} />
            <S.ProfileEditBtn>
              <img src={ProfileEdit} />
            </S.ProfileEditBtn>
          </S.ProfileImg>

          <S.Form>
            <span>Nickname</span>
            <Input />
            {/* 임시 버튼 */}
            <button onClick={() => setStep(1)}>Sign up</button>
          </S.Form>

          <S.BackButton>
            <img src={ArrowLeft} />
            Back
          </S.BackButton>
        </>
      )}
    </S.Container>
  );
}
