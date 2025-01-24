import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';

import type { TMyProfileValues } from '@/types/mypage/mypage';
import type { SOCIAL } from '@/enums/enums';

import findUnlinkedSocials from '@/utils/findUnlinkedSocials';
import { myPageScehma } from '@/utils/validate';

import { useImage } from '@/hooks/images/useImage';
import useUserInfo from '@/hooks/mypage/useUserInfo';

import { InputModule } from '@/components/auth/module/module';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import Button from '@/components/common/button/button';
import Profile from '@/components/common/profile/profile';

import * as S from './MyProfile.style';

import Plus from '@/assets/icons/add.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';
import { changeUserInfo } from '@/slices/authSlice';

export default function MyProfile() {
  const dispatch = useDispatch();
  const { useImageToUploadPresignedUrl, useGetPresignedUrl } = useImage();
  const { usePatchUserInfo, useGetUserInfo } = useUserInfo();

  const { data: userData, isLoading } = useGetUserInfo;
  const { mutate: getPresignedUrlMutate } = useGetPresignedUrl;
  const { mutate: uploadImageToPresignedUrlMutate } = useImageToUploadPresignedUrl;
  const { mutate: patchUserInfoMutation } = usePatchUserInfo;

  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const socialLogin: SOCIAL[] = userData?.result.account as SOCIAL[];
  const unlinkedSocials = findUnlinkedSocials(socialLogin);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<TMyProfileValues>({
    mode: 'onChange',
    resolver: zodResolver(myPageScehma),
  });

  const watchedBannerUrl = useWatch({
    control,
    name: 'bannerImage',
  });

  const watchedProfileUrl = useWatch({
    control,
    name: 'profileImage',
  });

  const watchedNickname = useWatch({
    control,
    name: 'nickname',
  });

  const inputRefs = {
    banner: useRef<HTMLInputElement | null>(null),
    profile: useRef<HTMLInputElement | null>(null),
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputClick = (type: 'banner' | 'profile') => {
    inputRefs[type].current?.click();
  };

  const handleImageUpload = async (file: File, type: string) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }
    getPresignedUrlMutate(
      { fileName: file.name },
      {
        onSuccess: (presignedUrlData) => {
          uploadImageToPresignedUrlMutate(
            {
              url: presignedUrlData.result.url,
              file: file,
            },
            {
              onSuccess: () => {
                if (type === 'banner' && presignedUrlData !== undefined) {
                  setBannerPreview(presignedUrlData.result.keyName);
                  setValue('bannerImage', presignedUrlData.result.keyName);
                } else if (type === 'profile' && presignedUrlData !== undefined) {
                  setProfilePreview(presignedUrlData.result.keyName);
                  setValue('profileImage', presignedUrlData.result.keyName);
                }
              },
            },
          );
        },
      },
    );
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'profile') => {
    const file = e.target.files?.[0];

    if (file) {
      handleImageUpload(file, type);
    }
  };

  const onSubmit: SubmitHandler<TMyProfileValues> = (data) => {
    setIsEdit(false);
    setBannerPreview('');
    setProfilePreview('');
    const updateData: { nickname: string; profileImage?: string; bannerImage?: string } = { nickname: data.nickname };

    if (watchedProfileUrl !== userData?.result.profileImage) {
      updateData.profileImage = watchedProfileUrl;
    } else if (userData?.result.profileImage) {
      updateData.profileImage = userData.result.profileImage.split('aws.com/')[1];
    }
    if (watchedBannerUrl !== userData?.result.bannerImage) {
      updateData.bannerImage = watchedBannerUrl;
    } else if (userData?.result.bannerImage) {
      updateData.bannerImage = userData.result.bannerImage.split('aws.com/')[1];
    }
    patchUserInfoMutation(updateData, {
      onSuccess: (newUserData) => {
        dispatch(changeUserInfo({ nickname: newUserData.result.nickname, profileImage: newUserData.result.profileImage }));
      },
    });
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

  useEffect(() => {
    if (userData) {
      setValue('nickname', userData.result.nickname);
      setValue('profileImage', userData.result.profileImage);
      setValue('bannerImage', userData.result.bannerImage);
    }
  }, [userData, setValue]);

  return (
    <>
      {isEdit ? (
        <S.ProfileWrapper>
          <input ref={inputRefs.banner} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleInputChange(e, 'banner')} />
          {bannerPreview ? (
            <S.BannerImg onClick={() => handleInputClick('banner')} url={import.meta.env.VITE_API_IMAGE_ACCESS + bannerPreview} />
          ) : (
            <S.BannerImg onClick={() => handleInputClick('banner')} url={watchedBannerUrl} />
          )}

          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg onClick={() => handleInputClick('profile')}>
                  {profilePreview ? (
                    <Profile profileImg={import.meta.env.VITE_API_IMAGE_ACCESS + profilePreview} />
                  ) : (
                    <Profile profileImg={watchedProfileUrl} />
                  )}
                  <S.ProfileEditBtn>
                    <ProfileEdit />
                  </S.ProfileEditBtn>
                </S.ProfileImg>
                <input ref={inputRefs.profile} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleInputChange(e, 'profile')} />
                <S.UserInfo>
                  <InputModule
                    touched={touchedFields.nickname}
                    valid={!errors.nickname?.message}
                    errorMessage={errors.nickname?.message}
                    Name={'Nickname'}
                    inputname={'normal'}
                    value={watchedNickname}
                    top={true}
                    {...register('nickname')}
                  />
                  <S.AccoutWrapper>
                    <S.Account>{userData?.result.email}</S.Account>
                    <div className="socialLogoWrapper">
                      <SocialLogo gap={8} size="small" id={socialLogin} />
                    </div>
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
                <Button type="small_square" color="default" disabled={!!errors.nickname?.message || isLoading} icon={<Done />} onClick={handleSubmit(onSubmit)}>
                  Done
                </Button>
              </S.ButtonWrapper>
            </S.Container2>
          </S.Profile>
        </S.ProfileWrapper>
      ) : (
        <S.ProfileWrapper>
          <S.BannerImg onClick={() => handleInputClick('banner')} url={userData?.result.bannerImage} />
          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg>
                  <Profile profileImg={userData?.result.profileImage} />
                </S.ProfileImg>
                <S.UserInfo>
                  <span>{userData?.result.nickname}</span>
                  <S.AccoutWrapper>
                    <S.Account>{userData?.result.email}</S.Account>
                    <div className="socialLogoWrapper">
                      <SocialLogo gap={8} size="small" disable={true} id={socialLogin} />
                    </div>
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
