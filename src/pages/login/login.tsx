import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/utils/validate';

import useInvite from '@/hooks/auth/useInvite';
import useUserAuth from '@/hooks/auth/useUserAuth';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';
import { isNowSignup } from '@/slices/authSlice';

type TFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  sessionStorage.removeItem('loginHandled');
  localStorage.setItem('route', 'login');
  const token = localStorage.getItem('inviteToken');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const watchedPassword = useWatch({
    control,
    name: 'password',
  });
  const watchedEmail = useWatch({
    control,
    name: 'password',
  });
  const navigate = useNavigate();

  const { useDefaultLogin } = useUserAuth();
  const { useInviteAccept } = useInvite();
  const { mutate: loginMutate, isPending } = useDefaultLogin;
  const { mutate: inviteMutate, isPending: invitePending } = useInviteAccept;
  const onSubmit: SubmitHandler<TFormValues> = async (submitData) => {
    loginMutate(
      { email: submitData.email, password: submitData.password },
      {
        onSuccess: (data) => {
          if (data?.result?.nickname === '') {
            dispatch(isNowSignup({ isSignup: true }));
            navigate('/signup/userSetting');
          } else if (token !== '' && token != null) {
            inviteMutate(
              { token },
              {
                onSuccess: (inviteResponse) => {
                  localStorage.setItem('InvitationResponse', 'success');
                  localStorage.removeItem('inviteToken');
                  navigate(`/project/information/${inviteResponse?.result.projectId}`);
                },
                onError: () => {
                  navigate('/project');
                  localStorage.setItem('InvitationResponse', 'error');
                },
              },
            );
          } else {
            navigate('/project');
          }
        },
        onError: (error) => {
          setErrorMessage(error.response?.data.message as string);
        },
      },
    );
  };

  return (
    <S.Container>
      <Logo className="logo" />
      <S.Container2>
        <S.Texts>
          <S.Title>Welcome to QASTUDIO !</S.Title>
          <S.Description>Login and enjoy QASTUDIO more.</S.Description>
        </S.Texts>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <InputModule
            inputname="email"
            Name="Email"
            span="Email"
            top={true}
            valid={!errors.email?.message && watchedEmail !== '' && !errorMessage}
            errorMessage={errors.email?.message || errorMessage}
            {...register('email')}
          />

          <InputModule
            inputname="password"
            Name="Password"
            span="Password"
            top={false}
            valid={!errors.password && watchedPassword !== ''}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </S.Form>
        <AuthButton format="normal" disabled={!isValid || isPending || invitePending} onClick={handleSubmit(onSubmit)}>
          Login
        </AuthButton>

        <OrDivider />
        <SocialLogo gap={20} size="large" />
        <S.Buttons>
          <S.Button onClick={() => navigate('/finding')}>Finding Passwords</S.Button>
          <S.Button onClick={() => navigate('/signup')}>Sign up</S.Button>
        </S.Buttons>
      </S.Container2>
    </S.Container>
  );
}
