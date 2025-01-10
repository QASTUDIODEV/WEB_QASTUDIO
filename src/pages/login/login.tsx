import type { SubmitHandler } from 'react-hook-form';
// import useForm from '@/hooks/auth/useForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/utils/validate';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import OrDivider from '@/components/auth/orDivider/orDivider';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';

import * as S from '@/pages/login/login.style.ts';

import Logo from '@/assets/icons/logo.svg?react';

type TFormValues = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    alert(data);
    // 로그인 로직 추후 추가 예정
  };

  return (
    <S.Container>
      <Logo style={{ width: '48px', height: '48px' }} />
      <S.Container2>
        <S.Texts>
          <S.Title>Welcome to QASTUDIO !</S.Title>
          <S.Description>Login and enjoy QASTUDIO more.</S.Description>
        </S.Texts>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {/* 유효성 검사에 따라 메시지 출력 */}
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
        {/* 임시 버튼 */}
        <AuthButton format="normal" disabled={!isValid} type={'submit'}>
          Login
        </AuthButton>

        <OrDivider />
      </S.Container2>

      <SocialLogo gap={20} size="large" />
      <S.Buttons>
        <S.Button onClick={() => navigate('/finding')}>Finding Passwords</S.Button>
        <S.Button onClick={() => navigate('/signup')}>Sign up</S.Button>
      </S.Buttons>
    </S.Container>
  );
}
