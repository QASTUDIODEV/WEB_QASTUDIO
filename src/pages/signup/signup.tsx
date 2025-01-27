import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema } from '@/utils/validate';

import useUserAuth from '@/hooks/auth/useUserAuth';

import AuthButton from '@/components/auth/authButton/authButton';
import { CodeModule, InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/signup/signup.style';
import { isSignup, login } from '@/slices/authSlice.ts';

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
  const { useDefaultSignup, useSendSignupCode } = useUserAuth();
  const { mutate: signupMutate, isPending: signupPending } = useDefaultSignup;
  const { mutate: sendCodeMutate, isPending: codePending } = useSendSignupCode;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const [step, setStep] = useState(0);

  const [AuthCode, setAuthCode] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>(undefined);

  const [codeverify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [passwordMatch, setPasswordMatch] = useState(false);

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

  const handleSendCode = async () => {
    setValue('code', '');
    if (!errors.email?.message) {
      sendCodeMutate(watchedEmail, {
        onSuccess: (data) => {
          setAuthCode(data.result.authCode);
          setStep(1);
          setEmailErrorMessage(undefined);
        },
        onError: (error) => {
          setEmailErrorMessage(error.response?.data.message || 'An error occurred.');
        },
      });
    }
  };

  const handleVerifyCode = () => {
    if (watchedCode === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  const onSubmit: SubmitHandler<TAPIFormValues> = (submitData) => {
    signupMutate(
      { email: submitData.email, password: submitData.password },
      {
        onSuccess: () => {
          dispatch(isSignup({ isSignup: true }));
          dispatch(login());
          navigate('/signup/userSetting');
        },
      },
    );
  };

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
        handleSubmit(onSubmit);
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
    setEmailErrorMessage(undefined);
    setStep(0);
  }, [watchedEmail]);

  return (
    <S.Container>
      <Logo className="logo" />
      <S.Form onKeyDown={handleKeyDown} onSubmit={handleSubmit(onSubmit)}>
        <S.Inputs>
          <InputModule
            top={true}
            inputname="email"
            Name="Email"
            span="Email"
            btnName="Send"
            handleSendCode={handleSendCode}
            touched={touchedFields.email}
            pending={codePending}
            valid={touchedFields.email && !errors.email?.message && !emailErrorMessage}
            errorMessage={errors.email?.message || emailErrorMessage}
            {...register('email')}
          />
          {step === 1 && (
            <CodeModule
              touched={touchedFields.code}
              valid={touchedFields.code && !errors.code?.message}
              errorMessage={errors.code?.message}
              Name={'Code'}
              codeverify={codeverify}
              handleVerifyCode={handleVerifyCode}
              {...register('code')}
            />
          )}
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
      </S.Form>
    </S.Container>
  );
}

export default SignupPage;
