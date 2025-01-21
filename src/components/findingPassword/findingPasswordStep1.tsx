import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { findingSendEmailCode } from '@/apis/auth/auth';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

import * as S from './findingPasswordStep.style';
import { CodeModule, InputModule } from '../auth/module/module';

type TCodeVerify = undefined | boolean;
type TStep1 = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
};
export default function FindingPasswordStep1({ setStep, step }: TStep1) {
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>(undefined);
  const [codeverify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [AuthCode, setAuthCode] = useState('');
  const {
    register,
    setValue,
    control,
    formState: { touchedFields, errors },
  } = useFormContext();

  const watchedEmail = useWatch({
    control,
    name: 'email',
  });

  const watchedCode = useWatch({
    control,
    name: 'code',
  });

  const { mutate: sendCodeMutation, isPending: codePending } = useCustomMutation({
    mutationFn: async ({ email }: { email: string }) => findingSendEmailCode(email),
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

  const handleVerifyCode = () => {
    if (watchedCode === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  useEffect(() => {
    if (codeverify) {
      setStep(2);
    }
  }, [AuthCode, watchedEmail, codeverify, watchedCode]);

  useEffect(() => {
    setStep(1);
    setValue('code', '');
    setAuthCode('');
    setCodeVerify(undefined);
    setEmailErrorMessage(undefined);
  }, [watchedEmail]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 1 && !errors.email?.message && touchedFields.email) {
        handleSendCode();
      }
      if (step === 1 && !errors.code?.message && touchedFields.code) {
        setStep(2);
      }
    }
  };

  return (
    <S.Wrapper onKeyDown={(e) => handleKeyDown(e)}>
      <InputModule
        top={true}
        inputname="email"
        Name="Email"
        span="Email"
        btnName="Send"
        disabled={codePending}
        handleSendCode={handleSendCode}
        touched={touchedFields.email}
        pending={codePending}
        valid={touchedFields.email && !errors.email?.message && !emailErrorMessage}
        errorMessage={(errors.email?.message as string) || emailErrorMessage}
        {...register('email')}
      />
      {AuthCode && (
        <CodeModule
          touched={touchedFields.code}
          valid={touchedFields.code && !errors.code?.message}
          errorMessage={errors.code?.message as string}
          Name={'Code'}
          codeverify={codeverify}
          handleVerifyCode={handleVerifyCode}
          {...register('code')}
        />
      )}
    </S.Wrapper>
  );
}
