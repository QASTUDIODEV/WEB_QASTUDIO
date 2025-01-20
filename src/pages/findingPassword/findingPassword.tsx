import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { findingSchema } from '@/utils/validate';
import { authSendEmailCode } from '@/apis/auth/auth';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

import AuthButton from '@/components/auth/authButton/authButton';
import { CodeModule, InputModule } from '@/components/auth/module/module';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/findingPassword/findingPassword.style';

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

export default function FindingPassword() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, touchedFields, isValid },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(findingSchema),
  });

  const [step, setStep] = useState(0);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>(undefined);
  const [codeverify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [AuthCode, setAuthCode] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // 아직 API가 없어서 임시로 만들어둔 코드
  const { mutate: sendCodeMutation, isPending: codePending } = useCustomMutation({
    mutationFn: async ({ email }: { email: string }) => authSendEmailCode(email), // 현재 사용 못합니다.
    onSuccess: (data) => {
      setAuthCode(data.result.authCode);
      setStep(1);
      setEmailErrorMessage(undefined);
    },
    onError: (error) => {
      console.log('Error object:', error);
      setEmailErrorMessage(error.response?.data.message || 'An error occurred.');
    },
  });

  const handleSendCode = async () => {
    setValue('code', '');
    if (!errors.email?.message) {
      sendCodeMutation({ email: watchedEmail });
    }
  };

  const onSubmit: SubmitHandler<TAPIFormValues> = (data) => {
    const { email, password } = data;
    console.log(email, password);
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && !errors.email?.message && touchedFields.email) {
        handleSendCode();
      }
      if (step === 1 && !errors.code?.message && touchedFields.code) {
        setStep(2);
      }
      if (step === 2 && !errors.password?.message && !errors.repassword?.message && touchedFields.password && touchedFields.repassword && passwordMatch) {
        const email = watchedEmail;
        const password = watchedPassword;
        onSubmit({ email, password });
      }
    }
  };

  const handleVerifyCode = () => {
    if (watchedCode === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  useEffect(() => {
    setStep(0);
    setValue('code', '');
    setCodeVerify(undefined);
  }, [watchedEmail]);

  useEffect(() => {
    if (codeverify) {
      setStep(2);
    }
  }, [AuthCode, watchedEmail, codeverify, watchedCode]);

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

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form onKeyDown={(e) => handleKeyDown(e)} onSubmit={handleSubmit(onSubmit)}>
        {(step === 0 || step === 1) && (
          <>
            <InputModule
              top={true}
              inputname="email"
              Name="Email"
              span="Email"
              btnName="Send"
              disabled={codePending}
              handleSendCode={handleSendCode}
              touched={touchedFields.email}
              valid={touchedFields.email && !errors.email?.message && !emailErrorMessage}
              errorMessage={errors.email?.message || emailErrorMessage}
              {...register('email')}
            />
          </>
        )}
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
        {step === 2 && (
          <>
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
            <AuthButton disabled={!isValid || !passwordMatch}>Go to the login</AuthButton>
          </>
        )}
      </S.Form>

      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </S.Container>
  );
}
