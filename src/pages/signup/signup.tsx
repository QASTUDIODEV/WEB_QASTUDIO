import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '@/utils/validate';
import { defaultSignup } from '@/apis/auth/auth';

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

type TFormValues = {
  email: string;
  password: string;
  repassword: string;
  code: string;
  nickname: string;
};

type TAPIFormValues = {
  email: string;
  password: string;
  nickname: string;
};

function SignupPage() {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const [step, setStep] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [codeverify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [AuthCode, setAuthCode] = useState('');
  const navigate = useNavigate();
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const watchedPassword = useWatch({
    control,
    name: 'password',
  });

  const watchedRepassword = useWatch({
    control,
    name: 'repassword',
  });

  const watchedEmail = useWatch({
    control,
    name: 'email',
  });

  const watchedCode = useWatch({
    control,
    name: 'code',
  });

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 클릭 시 기본 동작을 방지
    contentInputRef.current?.click();
  };

  const handleSendCode = () => {
    setValue('code', '');
    if (!errors.email?.message) {
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
      setAuthCode('1234'); //추후 API 요청해서 받아온 인증 값으로 변경 예정
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  const handleVerifyCode = () => {
    if (watchedCode === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  const onSubmit: SubmitHandler<TAPIFormValues> = (data) => {
    // alert(data.email);
    defaultSignup(data.email, data.password);
    navigate('/');
  };

  const handleNextStep = () => setStep(2);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && touchedFields.email && !errors.email?.message) {
        handleSendCode();
      }
      if (step === 1 && touchedFields.code && !errors.code?.message && !codeverify) {
        handleVerifyCode();
      }
      if (
        step === 1 &&
        touchedFields.email &&
        touchedFields.password &&
        touchedFields.repassword &&
        touchedFields.code &&
        passwordMatch &&
        codeverify &&
        !errors.email?.message &&
        !errors.password?.message &&
        !errors.repassword?.message &&
        !errors.code?.message
      ) {
        handleNextStep();
      }
      if (step === 2 && isValid) {
        const email = getValues('email');
        const password = getValues('password');
        const nickname = getValues('nickname');
        onSubmit({ email, password, nickname });
      }
    }
  };

  useEffect(() => {
    if (watchedPassword === watchedRepassword) {
      setPasswordMatch(true);
      setErrorMessage('');
    } else {
      setPasswordMatch(false);
      setErrorMessage('Passwords must match.');
    }
  }, [watchedPassword, watchedRepassword]);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    setCodeVerify(undefined);
    setStep(0);
  }, [watchedEmail]);

  const renderStep0 = () => (
    <>
      <S.Inputs>
        <InputModule
          top={true}
          inputname="email"
          Name="Email"
          span="Email"
          btnName="Send"
          handleSendCode={handleSendCode}
          touched={touchedFields.email}
          valid={touchedFields.email && !errors.email?.message}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <InputModule
          top={false}
          touched={touchedFields.password}
          valid={touchedFields.password && !errors.password?.message}
          errorMessage={errors.password?.message}
          Name={'Password'}
          inputname={'password'}
          span={'New Password'}
          {...register('password')}
        />
        <InputModule
          top={false}
          touched={touchedFields.repassword}
          valid={touchedFields.repassword && !errors.repassword?.message && passwordMatch}
          errorMessage={errors.repassword?.message || errorMessage}
          Name={'Password'}
          inputname={'password'}
          span={'Re-enter Password'}
          {...register('repassword')}
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
          top={true}
          inputname="email"
          Name="Email"
          span="Email"
          btnName="Send"
          handleSendCode={handleSendCode}
          touched={touchedFields.email}
          valid={touchedFields.email && !errors.email?.message}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <CodeModule
          touched={touchedFields.code}
          valid={touchedFields.code && !errors.code?.message}
          errorMessage={errors.code?.message}
          Name={'Code'}
          codeverify={codeverify}
          handleVerifyCode={handleVerifyCode}
          {...register('code')}
        />
        <InputModule
          top={false}
          touched={touchedFields.password}
          valid={touchedFields.password && !errors.password?.message}
          errorMessage={errors.password?.message}
          Name={'Password'}
          inputname={'password'}
          span={'New Password'}
          {...register('password')}
        />
        <InputModule
          top={false}
          touched={touchedFields.repassword}
          valid={touchedFields.repassword && !errors.repassword?.message && passwordMatch}
          errorMessage={errors.repassword?.message || errorMessage}
          Name={'Password'}
          inputname={'password'}
          span={'Re-enter Password'}
          {...register('repassword')}
        />
        <AuthButton
          type="button"
          format="normal"
          onClick={handleNextStep}
          disabled={
            !touchedFields.email ||
            !touchedFields.code ||
            !touchedFields.password ||
            !touchedFields.repassword ||
            !codeverify ||
            !passwordMatch ||
            !!errors.email?.message ||
            !!errors.code?.message ||
            !!errors.password?.message ||
            !!errors.repassword?.message
          }
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
        <S.Backdrop>
          <ProfileEdit />
        </S.Backdrop>
        <Profile />
        <S.ProfileEditBtn>
          <ProfileEdit />
        </S.ProfileEditBtn>
      </S.ProfileImg>
      <InputModule
        top={true}
        inputname="nickname"
        Name="Nickname"
        span="Nickname"
        touched={touchedFields.nickname}
        valid={touchedFields.nickname && !errors.nickname?.message}
        errorMessage={errors.nickname?.message}
        {...register('nickname')}
      />
      <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
      <AuthButton type="submit" format="normal" disabled={!isValid}>
        Sign up
      </AuthButton>
    </>
  );

  return (
    <S.Container>
      <Logo className="logo" />
      <S.Form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </S.Form>
    </S.Container>
  );
}

export default SignupPage;
