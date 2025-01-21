import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { findingSchema } from '@/utils/validate';

import useChagePassword from '@/hooks/auth/useChangePassword';

import FindingPasswordStep1 from '@/components/findingPassword/findingPasswordStep1';
import FindingPasswordStep2 from '@/components/findingPassword/findingPasswordStep2';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/findingPassword/findingPassword.style';

type TField = z.infer<typeof findingSchema>;

export default function FindingPassword() {
  const {
    control,
    formState: { errors, touchedFields },
  } = useForm<TField>({
    mode: 'onChange',
    resolver: zodResolver(findingSchema),
  });

  const [step, setStep] = useState(1);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const navigate = useNavigate();
  const methods = useForm<TField>();
  const { handleSubmit } = methods;

  const { mutate: changePasswordMutation } = useChagePassword();

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

  const onSubmit: SubmitHandler<TField> = (data) => {
    console.log(data);
    const { email, password } = data;

    changePasswordMutation(
      { email, newPassword: password },
      {
        onError: (error: any) => {
          const errorPasswordMessage = error?.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.';
          setPasswordErrorMessage(errorPasswordMessage);
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (
        step === 2 &&
        !errors.password?.message &&
        !errors.repassword?.message &&
        touchedFields.password &&
        touchedFields.repassword &&
        passwordMatch &&
        !passwordErrorMessage
      ) {
        const email = watchedEmail;
        const password = watchedPassword;
        const repassword = watchedRepassword;
        const code = watchedCode;
        onSubmit({
          email: email,
          password: password,
          repassword: repassword,
          code: code,
        });
      }
    }
  };

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <FormProvider {...methods}>
        <S.Form onKeyDown={(e) => handleKeyDown(e)} onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <FindingPasswordStep1 setStep={setStep} step={step} />}
          {step === 2 && (
            <FindingPasswordStep2
              setPasswordMatch={setPasswordMatch}
              passwordMatch={passwordMatch}
              setPasswordErrorMessage={setPasswordErrorMessage}
              passwordErrorMessage={passwordErrorMessage}
            />
          )}
        </S.Form>
      </FormProvider>

      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </S.Container>
  );
}
