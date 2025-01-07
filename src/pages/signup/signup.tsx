import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateCode, validateEmail, validateNickname, validateNotBlankCode, validatePassword, validateRepassword } from '@/utils/validate';

import AuthInput from '@/components/auth/authInput/authInput';
import CodeInput from '@/components/auth/codeInput/codeInput';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/signup/signup.style';

function SignupPage() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState({
    email: '',
    nickname: '',
    password: '',
    code: '',
    repassword: '',
  });
  const [inputs, setInputs] = useState({
    email: '',
    code: '',
    password: '',
    nickname: '',
    repassword: '',
  });
  const [validations, setValidations] = useState<{
    email: boolean | undefined;
    code: boolean | undefined;
    codeMatch: boolean | undefined;
    password: boolean | undefined;
    nickname: boolean | undefined;
    repassword: boolean | undefined;
  }>({
    email: undefined,
    code: undefined,
    codeMatch: undefined,
    password: undefined,
    nickname: undefined,
    repassword: undefined,
  });
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  // 추후 삭제 예정
  const buttonStyles = (enabled: boolean | undefined) => ({
    width: '100%',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: enabled ? '#0d409d' : '#a0a0a0',
    color: enabled ? 'white' : '#d3d3d3',
    cursor: enabled ? 'pointer' : 'not-allowed',
    height: '40px',
  });

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 클릭 시 기본 동작을 방지
    contentInputRef.current?.click();
  };

  const validateInput = (field: string, value: string) => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'code':
        return validateNotBlankCode(value);
      case 'nickname':
        return validateNickname(value)[0];
      case 'password':
        return validatePassword(value);
      case 'repassword':
        return validateRepassword(inputs.password, value);
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setInputs((prev) => ({ ...prev, [field]: value }));

    const error = validateInput(field, value);
    setValidations((prev) => ({
      ...prev,
      [field]: !error,
    }));
    setMessages((prev) => ({
      ...prev,
      [field]: error || '',
    }));
  };

  const handleSendCode = () => {
    if (validations.email) {
      alert('해당 이메일로 인증 코드가 발송되었습니다');
      setStep(1);
    } else {
      alert('올바른 이메일을 입력해주세요');
    }
  };

  const handleVerifyCode = () => {
    const codeError = validateCode(inputs.code, '1234');
    setValidations((prev) => ({
      ...prev,
      codeMatch: codeError === undefined ? false : !codeError,
    }));
    setMessages((prev) => ({
      ...prev,
      code: codeError || 'Authentication completed',
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleSubmit = (email: string, passwrod: string, nickname: string) => {
    navigate('/');
  };

  const handleNextStep = () => setStep(2);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (step === 0 && validations.email) {
        handleSendCode();
      }
      if (step === 1 && validations.code && !isValid) {
        handleVerifyCode();
      }
      if (step === 1 && isValid) {
        handleNextStep();
      }
      if (step === 2 && validations.nickname) {
        handleSubmit(inputs.email, inputs.password, inputs.nickname);
      }
    }
  };

  useEffect(() => {
    if (validations.codeMatch && validations.email && validations.password && validations.repassword) {
      setIsValid(true);
    }
  }, [validations]);

  const renderStep0 = () => (
    <>
      <S.Inputs>
        <S.Wrapper>
          <span>Email</span>
          <AuthInput
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={(e) => handleInputChange(e, 'email')}
            autoComplete="email"
            isValid={validations.email}
          />
          <div style={{ width: '80px', position: 'absolute', top: '22px', right: '-90px' }}>
            <button type="button" style={buttonStyles(validations.email)} onClick={handleSendCode} disabled={!validations.email}>
              Send
            </button>
          </div>

          {messages.email && (
            <S.MessageWrapper2>
              <ValidataionMessage message={messages.email} isError={!validations.email} />
            </S.MessageWrapper2>
          )}
        </S.Wrapper>

        <S.Wrapper>
          <span>Password</span>
          <AuthInput
            placeholder="Password"
            type="password"
            value={inputs.password}
            onChange={(e) => handleInputChange(e, 'password')}
            autoComplete="password"
            isValid={validations.password}
          />
        </S.Wrapper>

        <S.Wrapper>
          <AuthInput
            placeholder="Password"
            type="password"
            value={inputs.repassword}
            onChange={(e) => handleInputChange(e, 'repassword')}
            autoComplete="password"
            isValid={validations.repassword}
          />
        </S.Wrapper>

        {messages.password && (
          <S.MessageWrapper>
            <ValidataionMessage message={messages.password} isError={!validations.password || !validations.repassword} />
          </S.MessageWrapper>
        )}

        <button type="button" onClick={handleNextStep} style={buttonStyles(isValid)} disabled={!isValid}>
          Sign up
        </button>
      </S.Inputs>
      <OrDivider />
      <SocialLogo />
      <S.BackButton onClick={() => navigate(-1)}>
        <ArrowLeft style={{ width: '24px', height: '24px' }} />
        Back
      </S.BackButton>
    </>
  );

  const renderStep1 = () => (
    <>
      <S.Inputs>
        <S.Wrapper>
          <span>Email</span>
          <AuthInput
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={(e) => handleInputChange(e, 'email')}
            autoComplete="email"
            isValid={validations.email}
          />
          <div style={{ width: '80px', position: 'absolute', top: '24px', right: '-90px' }}>
            <button type="button" style={buttonStyles(validations.email)} onClick={handleSendCode} disabled={!validations.email}>
              ReSend
            </button>
          </div>

          {messages.email && (
            <S.MessageWrapper2>
              <ValidataionMessage message={messages.email} isError={!validations.email} />
            </S.MessageWrapper2>
          )}
        </S.Wrapper>

        <S.Wrapper>
          <CodeInput
            placeholder="Code"
            value={inputs.code}
            onChange={(e) => handleInputChange(e, 'code')}
            isValid={validations.code && validations.codeMatch}
          />
          {messages.code && (
            <S.MessageWrapper>
              <ValidataionMessage message={messages.code} isError={!validations.code || !validations.codeMatch} />
            </S.MessageWrapper>
          )}
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '-90px',
              width: '79px',
              padding: '0px 10px',
              backgroundColor: validations.email ? (validations.codeMatch ? '#007f7f' : '#0d409d') : '#a0a0a0',
              color: validations.email ? 'white' : '#d3d3d3', //임시로 막아봤습니다
              cursor: validations.email ? (validations.codeMatch ? 'not-allowed' : 'pointer') : 'not-allowed',
              border: 'none',
              borderRadius: '4px',
            }}
            onClick={handleVerifyCode}
            disabled={!validations.email}
          >
            Verify
          </button>
        </S.Wrapper>
        <S.Wrapper>
          <span>Password</span>
          <AuthInput
            placeholder="Password"
            value={inputs.password}
            onChange={(e) => handleInputChange(e, 'password')}
            type="password"
            autoComplete="password"
            isValid={validations.password}
          />
          {messages.password && (
            <S.MessageWrapper>
              <ValidataionMessage message={messages.password} isError={!validations.password} />
            </S.MessageWrapper>
          )}
        </S.Wrapper>
        <S.Wrapper>
          <AuthInput
            placeholder="Password"
            value={inputs.repassword}
            onChange={(e) => handleInputChange(e, 'repassword')}
            type="password"
            autoComplete="password"
            isValid={validations.repassword}
          />
          {messages.repassword && (
            <S.MessageWrapper>
              <ValidataionMessage message={messages.repassword} isError={!validations.repassword} />
            </S.MessageWrapper>
          )}
        </S.Wrapper>
        <button
          type="button"
          onClick={handleNextStep}
          style={buttonStyles(validations.email && validations.codeMatch && validations.password && validations.repassword)}
          disabled={!validations.email || !validations.codeMatch || !validations.password || !validations.repassword}
        >
          Sign up
        </button>
      </S.Inputs>
      <OrDivider />
      <SocialLogo />
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

      <S.Wrapper>
        <span>Nickname</span>
        <AuthInput
          placeholder="Nickname"
          type="text"
          value={inputs.nickname}
          onChange={(e) => handleInputChange(e, 'nickname')}
          autoComplete="nickname"
          isValid={validations.nickname}
        />
        {messages.nickname && (
          <S.MessageWrapper>
            <ValidataionMessage message={messages.nickname} isError={!validations.nickname} />
          </S.MessageWrapper>
        )}
      </S.Wrapper>
      <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
      <button
        type="button"
        onClick={() => handleSubmit(inputs.email, inputs.password, inputs.nickname)}
        style={buttonStyles(validations.nickname)}
        disabled={!validations.nickname}
      >
        Sign up
      </button>
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
