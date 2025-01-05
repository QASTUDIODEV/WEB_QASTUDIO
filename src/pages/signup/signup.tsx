import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/auth/input/AuthInput';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/signup/signup.style';

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [message, setMessage] = useState('The code is not correct'); //임시
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
            <S.Inputs>
              <S.Wrapper>
                <span>Email</span>
                <AuthInput placeholder={'Email'} type="email" />
                {/* 임시 버튼 */}
                <button
                  style={{
                    position: 'absolute',
                    right: '-70px',
                    top: '25px',
                    padding: '0px 10px',
                    backgroundColor: '#0d409d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Verify
                </button>
              </S.Wrapper>

              <S.Wrapper>
                <AuthInput placeholder={'Code'} type="code" isValid={false} />
                {message != null && (
                  <S.MessageWrapper>
                    <ValidataionMessage message={message} isError={true} />
                  </S.MessageWrapper>
                )}
              </S.Wrapper>

              <S.Wrapper>
                <span>Password</span>
                <AuthInput placeholder={'Password'} type="password" />
              </S.Wrapper>
            </S.Inputs>

            {/* 임시 버튼 */}
            <button onClick={() => setStep(1)} style={{ width: '100%', borderRadius: '4px', backgroundColor: '#0d409d', color: 'white', border: 'none' }}>
              Sign up
            </button>
            <OrDivider />
          </S.Form>

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

          <S.Form2>
            <S.Wrapper>
              <span>Nickname</span>
              <AuthInput placeholder={'Nickname'} type="nickname" />
            </S.Wrapper>
            {/* 임시 버튼 */}
            <button style={{ width: '100%', backgroundColor: '#0D409D', color: 'white', borderRadius: '4px', border: 'none' }}>
              Getting started with QASTUDIO
            </button>
            <S.MessageWrapper2>
              <ValidataionMessage message="Authentication completed" isError={false} />
            </S.MessageWrapper2>
            <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} />
          </S.Form2>

          <S.BackButton onClick={() => setStep(0)}>
            <ArrowLeft style={{ width: '24px', height: '24px' }} />
            Back
          </S.BackButton>
        </>
      )}
    </S.Container>
  );
}
