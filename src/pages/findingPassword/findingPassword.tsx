import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { findingSchema } from '@/utils/validate';

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
    formState: { errors, touchedFields, isValid },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(findingSchema),
  });

  const [step, setStep] = useState(0);
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

  const watchedEamil = useWatch({
    control,
    name: 'email',
  });

  const watchedCode = useWatch({
    control,
    name: 'code',
  });

  const handleSendCode = () => {
    if (!errors.email?.message) {
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
      setAuthCode('1234'); //추후 API 요청해서 받아온 인증 값으로 변경 예정
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  const onSubmit: SubmitHandler<TAPIFormValues> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { email, password } = data;
    // alert(email);
    // alert(password);
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
        const email = watchedEamil;
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
    setCodeVerify(undefined);
  }, [watchedEamil]);

  useEffect(() => {
    if (codeverify) {
      setStep(2);
    }
  }, [AuthCode, watchedEamil, codeverify, watchedCode]);

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
        {step === 0 && (
          <>
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
          </>
        )}
        {step === 1 && (
          <>
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
          </>
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
