import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateFinding } from '@/utils/validate';

import useForm from '@/hooks/auth/useForm';

import AuthButton from '@/components/auth/authButton/authButton';
import { CodeModule, ErrorDownModule, ErrorTopModule } from '@/components/auth/module/module';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import * as S from '@/pages/findingPassword/findingPassword.style';

type TCodeVerify = undefined | boolean;

export default function FindingPassword() {
  const finding = useForm({
    initialValue: {
      email: '',
      password: '',
      repassword: '',
      code: '',
      authCode: '',
    },
    validate: validateFinding,
  });

  const [step, setStep] = useState(0);
  const [codeVerify, setCodeVerify] = useState<TCodeVerify>(undefined);
  const [AuthCode, setAuthCode] = useState('');
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (!finding.errors.email) {
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
      setAuthCode('1234'); //추후 API 요청해서 받아온 인증 값으로 변경 예정
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (userEmail: string, newPassword: string) => {
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && finding.valid.email) {
        handleSendCode();
      }
      if (step === 1 && finding.valid.code) {
        setStep(2);
      }
      if (step === 2 && finding.valid.password && finding.valid.repassword) {
        handleSubmit(finding.values.email, finding.values.password);
      }
    }
  };

  const handleVerifyCode = () => {
    if (finding.values.code === AuthCode) {
      setCodeVerify(true);
    } else {
      setCodeVerify(false);
    }
  };

  useEffect(() => {
    if (codeVerify) {
      setStep(2);
    }
  }, [codeVerify]);

  useEffect(() => {
    setStep(0);
  }, []);
  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form onKeyDown={(e) => handleKeyDown(e)}>
        {step === 0 && (
          <>
            <ErrorTopModule
              name="email"
              Name="Email"
              span="Email"
              btnName="Send"
              touched={finding.touched.email}
              valid={finding.valid.email}
              errorMessage={finding.errors.email}
              handleSendCode={handleSendCode}
              {...finding.getTextInputProps('email')}
            />
          </>
        )}
        {step === 1 && (
          <>
            <ErrorTopModule
              name="email"
              Name="Email"
              span="Email"
              btnName="Send"
              touched={finding.touched.email}
              valid={finding.valid.email}
              errorMessage={finding.errors.email}
              handleSendCode={handleSendCode}
              {...finding.getTextInputProps('email')}
            />
            <CodeModule
              touched={finding.touched.code}
              valid={finding.valid.code}
              errorMessage={finding.errors.code}
              Name={'Code'}
              name={'code'}
              codeVerify={codeVerify}
              handleVerifyCode={handleVerifyCode}
              {...finding.getTextInputProps('code')}
            />
          </>
        )}
        {step === 2 && (
          <>
            <ErrorDownModule
              touched={finding.touched.password}
              valid={finding.valid.password}
              errorMessage={finding.errors.password}
              Name={'Password'}
              name={'password'}
              span={'New Password'}
              {...finding.getTextInputProps('password')}
            />
            <ErrorDownModule
              touched={finding.touched.repassword}
              valid={finding.valid.repassword}
              errorMessage={finding.errors.repassword}
              Name={'Password'}
              name={'password'}
              span={'Re-enter Password'}
              {...finding.getTextInputProps('repassword')}
            />
            <AuthButton
              disabled={!finding.valid.password || !finding.valid.repassword}
              onClick={() => handleSubmit(finding.values.email, finding.values.password)}
            >
              Go to the login
            </AuthButton>
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
