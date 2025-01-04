import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Input from '@/components/common/input/input.tsx';
import Profile from '@/components/common/profile/profile';

import Logo from '/public/icons/logo.svg?react';
import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/signup/signup.style';

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  // const [userProfileImg, setUserProfileImg] = useState('');
  const contentInputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    contentInputRef.current?.click();
  };

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
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
            <S.MessageWrapper>
              <ValidataionMessage message="Authentication completed" isError={false} />
            </S.MessageWrapper>

            <S.Wrapper>
              <span>Password</span>
              <Input />
            </S.Wrapper>
            {/* 임시 버튼 */}
            <button onClick={() => setStep(1)}>Sign up</button>
          </S.Form>

          <OrDivider />
          <SocialLogo />
          <S.BackButton onClick={() => navigate(-1)}>
            <ArrowLeft style={{ width: '24px', height: '24px' }} />
            Back
          </S.BackButton>
        </>
      )}
      {step === 1 && (
        <>
          <S.ProfileImg onClick={handleInputClick}>
            <Profile />
            <S.ProfileEditBtn>
              <ProfileEdit />
            </S.ProfileEditBtn>
            <S.Backdrop>
              <ProfileEdit />
            </S.Backdrop>
          </S.ProfileImg>

          <S.Form>
            <span>Nickname</span>
            <Input />
            {/* 임시 버튼 */}
            <button onClick={() => setStep(1)}>Sign up</button>
            <S.MessageWrapper2>
              <ValidataionMessage message="Authentication completed" isError={false} />
            </S.MessageWrapper2>
            <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} />
          </S.Form>

          <S.BackButton onClick={() => setStep(0)}>
            <ArrowLeft style={{ width: '24px', height: '24px' }} />
            Back
          </S.BackButton>
        </>
      )}
    </S.Container>
  );
}
