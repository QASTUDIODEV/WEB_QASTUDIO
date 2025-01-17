import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { myPageScehma } from '@/utils/validate';

import { useGetPresignedUrl } from '@/hooks/images/useGetPresignedURL';
import { useUploadPresignedUrl } from '@/hooks/images/useUploadPresignedURL';
import { useGetUserInfo } from '@/hooks/userController/userController';

import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import ValidataionMessage from '@/components/auth/validationMessage/validationMessage';
import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Profile from '@/components/common/profile/profile';

import * as S from './MyProfile.style';

import Plus from '@/assets/icons/add.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';

type TSocialPlatform = 'github' | 'kakao' | 'google';

type TMyProfile = {
  isEdit: boolean;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  socialLogin: TSocialPlatform[];
  unlinkedSocials: TSocialPlatform[];
};

type TFormValues = {
  nickname: string;
  profileImage: string;
  bannerImage: string;
};

export default function MyProfile({ isEdit, setIsEdit, socialLogin, unlinkedSocials, nickname }: TMyProfile) {
  const { userData } = useGetUserInfo();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isValid, errors, touchedFields },
  } = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(myPageScehma),
    defaultValues: {
      nickname: '',
      profileImage: '',
      bannerImage: '',
    },
  });

  const watchedBannerUrl = useWatch({
    control,
    name: 'bannerImage',
  });

  const watchedProfileUrl = useWatch({
    control,
    name: 'profileImage',
  });

  const inputRefs = {
    banner: useRef<HTMLInputElement | null>(null),
    profile: useRef<HTMLInputElement | null>(null),
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const { getPresignedUrl, uploadSingleImgPending } = useGetPresignedUrl();
  const { uploadPresignedUrlMutate } = useUploadPresignedUrl();

  const handleInputClick = (type: 'banner' | 'profile') => {
    inputRefs[type].current?.click();
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }
    try {
      const imgUrl = await getPresignedUrl(file.name);
      console.log(imgUrl);
      await uploadPresignedUrlMutate({ _presignedUrl: imgUrl, blob: file });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'profile') => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);

      const fileUrl = URL.createObjectURL(file);
      if (type === 'banner') {
        setValue('bannerImage', fileUrl);
      } else if (type === 'profile') {
        setValue('profileImage', fileUrl);
      }
    }
  };

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    setIsEdit(false);
  };

  useEffect(() => {
    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target) && !contentRef.current?.contains(target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <>
      {isEdit ? (
        <S.ProfileWrapper>
          <input ref={inputRefs.banner} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleInputChange(e, 'banner')} />
          <S.BannerImg onClick={() => handleInputClick('banner')} url={watchedBannerUrl} />
          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg onClick={() => handleInputClick('profile')}>
                  <Profile profileImg={watchedProfileUrl} />
                  <S.ProfileEditBtn>
                    <ProfileEdit />
                  </S.ProfileEditBtn>
                </S.ProfileImg>
                <input ref={inputRefs.profile} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleInputChange(e, 'profile')} />
                <S.UserInfo>
                  <S.InputValidateWrapper>
                    {errors.nickname?.message && (
                      <S.MessageWrapper>
                        <ValidataionMessage message={errors.nickname?.message} isError />
                      </S.MessageWrapper>
                    )}
                    <Input width="268px" {...register('nickname')} />
                  </S.InputValidateWrapper>
                  <S.AccoutWrapper>
                    <S.Account>email.email.com</S.Account>
                    <SocialLogo gap={8} size="small" id={socialLogin} disable />
                    <div ref={containerRef}>
                      {unlinkedSocials.length > 0 && (
                        <S.PlusWrapper onClick={() => setShow(true)}>
                          <Plus />
                          {show && (
                            <S.SocialLogoWrapper ref={contentRef}>
                              <SocialLogo gap={8} size="small" id={unlinkedSocials} />
                            </S.SocialLogoWrapper>
                          )}
                        </S.PlusWrapper>
                      )}
                    </div>
                  </S.AccoutWrapper>
                </S.UserInfo>
              </S.ProfileUserInfo>
              <S.ButtonWrapper>
                <Button type="small_square" color="default" disabled={!!errors.nickname} icon={<Done />} onClick={handleSubmit(onSubmit)}>
                  Done
                </Button>
              </S.ButtonWrapper>
            </S.Container2>
          </S.Profile>
        </S.ProfileWrapper>
      ) : (
        <S.ProfileWrapper>
          <S.BannerImg onClick={() => handleInputClick('banner')} url={watchedBannerUrl} />
          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg>
                  <Profile profileImg={watchedProfileUrl} />
                </S.ProfileImg>
                <S.UserInfo>
                  <span>{nickname}</span>
                  <S.AccoutWrapper>
                    <S.Account>email.email.com</S.Account>
                    <SocialLogo gap={8} size="small" disable id={socialLogin} />
                  </S.AccoutWrapper>
                </S.UserInfo>
              </S.ProfileUserInfo>
              <S.ButtonWrapper>
                <Button type="small_square" color="default" icon={<Edit />} onClick={() => setIsEdit(true)}>
                  Edit
                </Button>
              </S.ButtonWrapper>
            </S.Container2>
          </S.Profile>
        </S.ProfileWrapper>
      )}
    </>
  );
}
