import React, { useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';

import { userSettingSchema } from '@/utils/validate';

import useUserAuth from '@/hooks/auth/useUserAuth';
import { useImage } from '@/hooks/images/useImage';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import Profile from '@/components/common/profile/profile';

import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/userSetting/userSetting.style';
import { userSetting } from '@/slices/authSlice';

type TFormValues = {
  nickname: string;
  profileImage: string;
};

export default function UserSetting() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const watchedImage = useWatch({
    control,
    name: 'profileImage',
  });

  const { useImageToUploadPresignedUrl, useGetPresignedUrl } = useImage();
  const { useSettingUserInfo } = useUserAuth();

  const { mutate: getPresignedUrlMutate, isPending: getPresignedUrlPending } = useGetPresignedUrl;
  const { mutate: uploadImageToPresignedUrlMutate, isPending: uploadImageToPresignedUrlPending } = useImageToUploadPresignedUrl;
  const { mutate: userSettingMutate } = useSettingUserInfo;

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }

    getPresignedUrlMutate(
      { fileName: file.name },
      {
        onSuccess: (data) => {
          uploadImageToPresignedUrlMutate(
            {
              url: data.result.url,
              file: file,
            },
            {
              onSuccess: (res) => {
                console.log(res);
                setValue('profileImage', import.meta.env.VITE_API_IMAGE_ACCESS + data.result.keyName);
              },
            },
          );
        },
      },
    );
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    userSettingMutate(
      { nickname: data.nickname, profileImage: watchedImage },
      {
        onSuccess: (_, variables) => {
          dispatch(userSetting({ nickname: variables.nickname, profileImage: variables.profileImage }));
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      if (touchedFields.nickname && !errors.nickname?.message && !getPresignedUrlPending && !uploadImageToPresignedUrlPending) {
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
          <Profile profileImg={watchedImage} />
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
        <AuthButton onClick={handleSubmit(onSubmit)} format="normal" disabled={!isValid || uploadImageToPresignedUrlPending || getPresignedUrlPending}>
          Sign up
        </AuthButton>
      </S.Form>
    </S.Container>
  );
}
