import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { uploadPresignedUrl, uploadSingleImg } from '@/apis/images/images';

import { useCustomMutation } from '@/hooks/auth/useCustomMutation';

import AuthButton from '@/components/auth/authButton/authButton';
import { InputModule } from '@/components/auth/module/module';
import Profile from '@/components/common/profile/profile';

import { userSettingSchema } from '../../utils/validate';

import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import * as S from '@/pages/userSetting/userSetting.style';

type TFormValues = {
  nickname: string;
};

export function renderStep2(step: number) {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
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

  const { mutate: uploadSingleImgMutate, isPending: uploadSingleImgPending } = useCustomMutation({
    mutationFn: ({ imgName }: { imgName: string }) => uploadSingleImg(imgName),
    onSuccess: (data) => {
      setUrl(data.result.url);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: uploadPresignedUrlMutate, isPending: uploadPresignedUrlPending } = useCustomMutation({
    mutationFn: ({ presignedUrl, blob }: { presignedUrl: string; blob: File }) => uploadPresignedUrl(presignedUrl, blob),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleImageUpload = async (blob: File) => {
    if (!blob.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }

    try {
      uploadSingleImgMutate({ imgName: blob.name });
      uploadPresignedUrlMutate({ presignedUrl: url, blob: blob });
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

  //무슨 api를 사용해야할 지 몰라 일단 비워뒀습니다
  const onSubmit = (data: any) => {
    navigate('/login');
  };

  if (step !== 2) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}
