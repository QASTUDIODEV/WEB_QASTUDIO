import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetPresignedUrl } from '@/hooks/common/useGetPresignedURL';
import { useUploadPresignedUrl } from '@/hooks/common/useUploadPresignedURL';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import Profile from '@/components/common/profile/profile';

import { userSettingSchema } from '../../utils/validate';

import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/userSetting/userSetting.style';

type TFormValues = {
  nickname: string;
};

export default function UserSetting() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(userSettingSchema),
  });

  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 클릭 시 기본 동작을 방지
    contentInputRef.current?.click();
  };

  const { uploadSingleImgMutate, uploadSingleImgPending, presignedUrl } = useGetPresignedUrl();
  const { uploadPresignedUrlMutate, uploadPresignedUrlPending } = useUploadPresignedUrl();

  const handleImageUpload = async (blob: File) => {
    if (!blob.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }

    try {
      uploadSingleImgMutate({ imgName: blob.name });
      uploadPresignedUrlMutate({ _presignedUrl: presignedUrl, blob: blob });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 사용자가 선택한 첫 번째 파일
    if (file) {
      await handleImageUpload(file);
    }
  };

  const onSubmit = () => {
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (touchedFields.nickname && !errors.nickname?.message && !uploadSingleImgPending && !uploadPresignedUrlPending) {
        handleSubmit(onSubmit);
      }
    }
  };

  return (
    <S.Container>
      <Logo className="logo" />
      <S.Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <S.ProfileImg onClick={handleInputClick}>
          <S.Backdrop>
            <ProfileEdit />
          </S.Backdrop>
          <Profile />
          <S.ProfileEditBtn>
            <ProfileEdit />
          </S.ProfileEditBtn>
        </S.ProfileImg>
        <InputModule
          top={true}
          inputname="nickname"
          Name="Nickname"
          span="Nickname"
          touched={touchedFields.nickname}
          valid={touchedFields.nickname && !errors.nickname?.message}
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />
        <input
          className="profile-image-upload"
          ref={contentInputRef}
          type="file"
          accept="image/*"
          tabIndex={-1}
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
        <AuthButton onClick={handleSubmit(onSubmit)} format="normal" disabled={!isValid || uploadPresignedUrlPending}>
          Sign up
        </AuthButton>
      </S.Form>
    </S.Container>
  );
}
