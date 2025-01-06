import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateEmail, validateNickname, validatePassword, validateRepassword } from '@/utils/validate';

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

type TValid = undefined | boolean;

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [emailMessage, setEamilMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');

  const [codeMessage, setCodeMessage] = useState('');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [repassword, setRepassword] = useState('');
  const [isCodeValid, setIsCodeValid] = useState<TValid>(undefined);
  const [isEmailValid, setIsEmailValid] = useState<TValid>(undefined);
  const [isPasswordValid, setIsPasswordValid] = useState<TValid>(undefined);
  const [isNicknameValid, setIsNicknameValid] = useState<TValid>(undefined);
  const [isRepasswordValid, setIsRepasswordValid] = useState<TValid>(undefined);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const buttonStyles = {
    width: '100%',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: isValid ? '#0d409d' : '#a0a0a0',
    color: isValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
    cursor: isValid ? 'pointer' : 'not-allowed',
  };

  const handleInputClick = () => {
    contentInputRef.current?.click();
  };

  // 이메일 인증 확인
  const handleVerify = () => {
    isEmailValid ? alert('해당 이메일로 인증 코드가 발송되었습니다') : alert('올바른 이메일을 입력해주세요');
  };

  // 코드 실시간 검증
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const codeValue = e.target.value;
    setCode(codeValue);

    if (codeValue === '1234') {
      setIsCodeValid(true);
      setCodeMessage('Authentication completed');
    } else {
      setIsCodeValid(false);
      setCodeMessage('The code is not correct');
    }
  };

  // 이메일 입력 변경
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailError = validateEmail(emailValue);

    setIsEmailValid(!emailError);
    setEamilMessage(emailError || '');
  };

  // 닉네임 입력 변경
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);
    const validationErrors = validateNickname(nicknameValue);

    setIsNicknameValid(validationErrors.length === 0);
    setNicknameMessage(validationErrors[0] || '');
  };

  // 비밀번호 입력 변경
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const passwordError = validatePassword(passwordValue);

    setIsPasswordValid(!passwordError);
    setPasswordMessage(passwordError || '');
  };

  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repasswordValue = e.target.value;
    setRepassword(repasswordValue);
    const repasswordError = validateRepassword(password, repasswordValue);
    setIsRepasswordValid(!repasswordError);
    setPasswordMessage(repasswordError || '');
  };

  // 마지막 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isCodeValid) {
      setIsValid(true);
    }
  }, [isEmailValid, isPasswordValid, isCodeValid]);

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Form onSubmit={handleSubmit}>
        {step === 0 ? (
          <>
            <S.Inputs>
              {/* 이메일 입력 */}
              <S.Wrapper>
                <span>Email</span>
                <AuthInput placeholder="Email" type="email" value={email} onChange={handleEmailChange} autoComplete="email" isValid={isEmailValid} />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '-70px',
                    top: '24px',
                    padding: '0px 10px',
                    backgroundColor: isEmailValid ? '#0d409d' : '#a0a0a0',
                    color: isEmailValid ? 'white' : '#d3d3d3', //임시로 막아봤습니다
                    cursor: isEmailValid ? 'pointer' : 'not-allowed',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                  onClick={handleVerify}
                  disabled={!isEmailValid}
                >
                  Verify
                </button>
                {emailMessage && (
                  <S.MessageWrapper2>
                    <ValidataionMessage message={emailMessage} isError={!isEmailValid || !isPasswordValid || !isRepasswordValid} />
                  </S.MessageWrapper2>
                )}
              </S.Wrapper>

              {/* 인증 코드 입력 */}
              <S.Wrapper>
                <CodeInput placeholder="Code" value={code} onChange={handleCodeChange} isValid={isCodeValid} />
                {codeMessage && (
                  <S.MessageWrapper>
                    <ValidataionMessage message={codeMessage} isError={!isCodeValid} />
                  </S.MessageWrapper>
                )}
              </S.Wrapper>

              {/* 비밀번호 입력 */}
              <S.Wrapper>
                <span>Password</span>
                <AuthInput
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="password"
                  isValid={isPasswordValid}
                />
              </S.Wrapper>
              <S.Wrapper>
                <AuthInput
                  placeholder="Re-enter Password"
                  type="password"
                  value={repassword}
                  onChange={handleRePasswordChange}
                  autoComplete="password"
                  isValid={isRepasswordValid}
                />
              </S.Wrapper>
              {isCodeValid && (!isPasswordValid || !isRepasswordValid) && <S.Info>8 or more including numbers, letters, and special characters</S.Info>}
              {passwordMessage && (
                <S.MessageWrapper>
                  <ValidataionMessage message={passwordMessage} isError={!isEmailValid || !isPasswordValid || !isRepasswordValid} />
                </S.MessageWrapper>
              )}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setPasswordMessage('');
                }}
                style={buttonStyles}
                disabled={!isEmailValid || !isPasswordValid || !isCodeValid || !isRepasswordValid}
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
        ) : (
          <>
            <S.ProfileImg onClick={handleInputClick}>
              <Profile />
              <S.ProfileEditBtn>
                <ProfileEdit />
              </S.ProfileEditBtn>
              <S.Backdrop>
                <ProfileEdit />
              </S.Backdrop>
            </S.ProfileImg>

            <S.Wrapper>
              {nicknameMessage && (
                <S.MessageWrapper2>
                  <ValidataionMessage message={nicknameMessage} isError={!isNicknameValid} />
                </S.MessageWrapper2>
              )}
              <span>Nickname</span>
              <AuthInput
                placeholder="Nickname"
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                autoComplete="nickname"
                isValid={isNicknameValid}
              />
            </S.Wrapper>

            <button
              type="submit"
              style={{
                ...buttonStyles,
                backgroundColor: isNicknameValid ? '#0d409d' : '#a0a0a0',
                color: isNicknameValid ? 'white' : '#d3d3d3',
                cursor: isNicknameValid ? 'pointer' : 'not-allowed',
              }}
              disabled={!isNicknameValid}
            >
              Getting started with QASTUDIO
            </button>
          </>
        )}
      </S.Form>
    </S.Container>
  );
}
