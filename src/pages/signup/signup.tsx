import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateSignup } from '@/utils/validate';

import useForm from '@/hooks/auth/useForm';

import AuthButton from '@/components/auth/authButton/authButton';
import { CodeModule, InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/signup/signup.style';

type TCodeVerify = undefined | boolean;

function SignupPage() {
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      repassword: '',
      code: '',
      nickname: '',
      authCode: '',
    },
    validate: validateSignup,
  });

  const [step, setStep] = useState(0);

  const [isValid, setIsValid] = useState(false);
  const [codeVerify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [AuthCode, setAuthCode] = useState('');
  const navigate = useNavigate();
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 클릭 시 기본 동작을 방지
    contentInputRef.current?.click();
  };

  useEffect(() => {
    if (!signup.errors.email && !signup.errors.password && !signup.errors.code && !signup.errors.repassword && !signup.errors.nickname) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [signup.errors, signup.values]);

  const handleSendCode = () => {
    if (!signup.errors.email) {
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
      setAuthCode('1234'); //추후 API 요청해서 받아온 인증 값으로 변경 예정
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  const handleVerifyCode = () => {
    if (signup.values.code === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleSubmit = (email: string, passwrod: string, nickname: string) => {
    navigate('/');
  };

  const handleNextStep = () => setStep(2);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && signup.valid.email) {
        handleSendCode();
      }
      if (step === 1 && signup.valid.code && !isValid) {
        handleVerifyCode();
      }
      if (step === 1 && signup.valid.code && signup.valid.email && signup.valid.password && signup.valid.repassword) {
        handleNextStep();
      }
      if (step === 2 && signup.valid.nickname) {
        handleSubmit(signup.values.email, signup.values.password, signup.values.nickname);
      }
    }
  };

  const renderStep0 = () => (
    <>
      <S.Inputs>
        <InputModule
          name="email"
          Name="Email"
          span="Email"
          btnName="Send"
          touched={signup.touched.email}
          valid={signup.valid.email}
          errorMessage={signup.errors.email}
          handleSendCode={handleSendCode}
          top={true}
          {...signup.getTextInputProps('email')}
        />
        <InputModule
          name="password"
          Name="Password"
          span="Password"
          touched={signup.touched.password}
          valid={signup.valid.password}
          errorMessage={signup.errors.password}
          handleSendCode={handleSendCode}
          top={false}
          {...signup.getTextInputProps('password')}
        />
        <InputModule
          name="password"
          Name="Password"
          touched={signup.touched.repassword}
          valid={signup.valid.repassword}
          errorMessage={signup.errors.repassword}
          handleSendCode={handleSendCode}
          top={false}
          {...signup.getTextInputProps('repassword')}
        />
        <AuthButton type="button" format="normal" onClick={handleNextStep} disabled={!isValid}>
          Sign up
        </AuthButton>
      </S.Inputs>
      <OrDivider />
      <SocialLogo gap={20} size="large" />
      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </>
  );

  const renderStep1 = () => (
    <>
      <S.Inputs>
        <InputModule
          name="email"
          Name="Email"
          span="Email"
          btnName="Resend"
          touched={signup.touched.email}
          valid={signup.valid.email}
          errorMessage={signup.errors.email}
          handleSendCode={handleSendCode}
          top={true}
          {...signup.getTextInputProps('email')}
        />
        <CodeModule
          touched={signup.touched.code}
          valid={signup.valid.code}
          errorMessage={signup.errors.code}
          Name={'Code'}
          name={'code'}
          codeVerify={codeVerify}
          handleVerifyCode={handleVerifyCode}
          {...signup.getTextInputProps('code')}
        />
        <InputModule
          top={false}
          name="password"
          Name="Password"
          span="Password"
          touched={signup.touched.password}
          valid={signup.valid.password}
          errorMessage={signup.errors.password}
          handleSendCode={handleSendCode}
          {...signup.getTextInputProps('password')}
        />
        <InputModule
          name="password"
          Name="Password"
          touched={signup.touched.repassword}
          valid={signup.valid.repassword}
          errorMessage={signup.errors.repassword}
          handleSendCode={handleSendCode}
          top={false}
          {...signup.getTextInputProps('repassword')}
        />
        <AuthButton
          type="button"
          format="normal"
          onClick={handleNextStep}
          disabled={!signup.valid.code || !codeVerify || !signup.valid.email || !signup.valid.password || !signup.valid.repassword}
        >
          Sign up
        </AuthButton>
      </S.Inputs>
      <OrDivider />
      <SocialLogo gap={20} size="large" />
      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </>
  );

  const renderStep2 = () => (
    <>
      <S.ProfileImg onClick={handleInputClick}>
        <Profile />
        <S.ProfileEditBtn>
          <ProfileEdit />
        </S.ProfileEditBtn>
      </S.ProfileImg>
      <InputModule
        top={true}
        name="nickname"
        Name="Nickname"
        span="Nickname"
        touched={signup.touched.nickname}
        valid={signup.valid.nickname}
        errorMessage={signup.errors.nickname}
        {...signup.getTextInputProps('nickname')}
      />
      <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
      <AuthButton
        type="button"
        format="normal"
        onClick={() => handleSubmit(signup.values.email, signup.values.password, signup.values.nickname)}
        disabled={!signup.valid.nickname}
      >
        Sign up
      </AuthButton>
    </>
  );

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form onKeyDown={handleKeyDown}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </S.Form>
    </S.Container>
  );
}

export default SignupPage;
