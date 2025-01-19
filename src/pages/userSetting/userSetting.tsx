import React, { useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { userSettingSchema } from '@/utils/validate';
import { userSetting } from '@/apis/auth/auth';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';
import { useGetPresignedUrl } from '@/hooks/images/useGetPresignedURL';
import { useUploadPresignedUrl } from '@/hooks/images/useUploadPresignedURL';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import Profile from '@/components/common/profile/profile';

import Logo from '@/assets/icons/logo.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/userSetting/userSetting.style';

type TFormValues = {
  nickname: string;
  profileImage: string;
};

export default function UserSetting() {
  const navigate = useNavigate();
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

  const { getPresignedUrl, uploadSingleImgPending } = useGetPresignedUrl();
  const { uploadPresignedUrlAsync, uploadPresignedUrlPending } = useUploadPresignedUrl();

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }

    try {
      const data = await getPresignedUrl(file.name);
      await uploadPresignedUrlAsync(data.url, file);
      setValue('profileImage', 'https://qastudio-s3.s3.ap-northeast-2.amazonaws.com/' + data.keyName);
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

  const { mutate: userSettingMutation } = useCustomMutation({
    mutationFn: ({ nickname, profileImage }: { nickname: string; profileImage: string }) => userSetting({ nickname, profileImage }),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    userSettingMutation({ nickname: data.nickname, profileImage: watchedImage });
    navigate('/project');
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
        <AuthButton onClick={handleSubmit(onSubmit)} format="normal" disabled={!isValid || uploadPresignedUrlPending}>
          Sign up
        </AuthButton>
      </S.Form>
    </S.Container>
  );
}
