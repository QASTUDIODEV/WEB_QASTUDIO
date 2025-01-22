import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { loginSchema } from '@/utils/validate';
import { defaultLogin } from '@/apis/auth/auth';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';
import { login } from '@/slices/authSlice';

type TFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const watchedEmail = useWatch({
    control,
    name: 'email',
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => defaultLogin({ email, password }),
    onSuccess: (data) => {
      const { token, nickname, profileImage } = data.result;
      const { accessToken, refreshToken } = token;
      dispatch(login({ email: watchedEmail, accessToken: accessToken, refreshToken: refreshToken, nickname: nickname, profileImage: profileImage }));
      navigate('/project');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    loginMutation({ email: data.email, password: data.password });
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
            touched={touchedFields.email}
            valid={touchedFields.email && !errors.email?.message}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <InputModule
            inputname="password"
            Name="Password"
            span="Password"
            top={false}
            touched={touchedFields.password}
            valid={touchedFields.password && !errors.password}
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </S.Form>
        <AuthButton format="normal" disabled={!isValid || isPending} onClick={handleSubmit(onSubmit)}>
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
