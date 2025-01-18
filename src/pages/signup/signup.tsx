import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '@/utils/validate';
import { authSendEmailCode, defaultSignup } from '@/apis/auth/auth';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

import AuthButton from '@/components/auth/authButton/authButton';
import { CodeModule, InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import { renderStep2 } from '../userSetting/userSetting';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/signup/signup.style';

type TCodeVerify = undefined | boolean;

type TFormValues = {
  email: string;
  password: string;
  repassword: string;
  code: string;
};

type TAPIFormValues = {
  email: string;
  password: string;
};

function SignupPage() {
  const {
    register,
    handleSubmit,
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

  const { mutate: sendCodeMutation, isPending: codePending } = useCustomMutation({
    mutationFn: async ({ email }: { email: string }) => authSendEmailCode(email),
    onSuccess: (data) => {
      setAuthCode(data.result.authCode);
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
    },
    onError: (error) => {
      console.log('Error object:', error);
      alert(error.response?.data.message);
    },
  });

  const { mutate: signupMutation, isPending: signupPending } = useCustomMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => defaultSignup({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      setStep(2);
    },
    onError: (error) => {
      console.log('Error object:', error);
      alert(error.response?.data.message);
    },
  });

  const handleSendCode = async () => {
    setValue('code', '');
    if (!errors.email?.message) {
      sendCodeMutation({ email: watchedEmail });
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
    signupMutation({ email: data.email, password: data.password });
    setStep(2);
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
          pending={codePending}
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
        <ArrowLeft />
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
          onClick={handleSubmit(onSubmit)}
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
            !!errors.repassword?.message ||
            signupPending
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

  return (
    <S.Container>
      <Logo className="logo" />
      <S.Form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
      </S.Form>
      {renderStep2(step)}
    </S.Container>
  );
}

export default SignupPage;
