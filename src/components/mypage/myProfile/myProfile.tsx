import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { TMyProfileValues, TSocialPlatform } from '@/types/mypage/mypage';
import type { TGetUserInfoResponse } from '@/types/userController/userController';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import findUnlinkedSocials from '@/utils/findUnlinkedSocials';
import { getImageUrl } from '@/utils/getImageUrl';
import { myPageScehma } from '@/utils/validate';
import { getUserInfo, patchUserInfo } from '@/apis/userController/userController';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';
import { useGetPresignedUrl } from '@/hooks/images/useGetPresignedURL';
import { useUploadPresignedUrl } from '@/hooks/images/useUploadPresignedURL';

import { InputModule } from '@/components/auth/module/module';
import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import Button from '@/components/common/button/button';
import Profile from '@/components/common/profile/profile';

import * as S from './MyProfile.style';

import Plus from '@/assets/icons/add.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';

export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: userData,
    isLoading,
    isPending,
  } = useQuery<TGetUserInfoResponse, Error>({
    queryKey: QUERY_KEYS.GET_USER_INFO,
    queryFn: async () => {
      return await getUserInfo();
    },
  });
  const queryClient = useQueryClient();

  const socialLogin: TSocialPlatform[] = userData?.result.account as TSocialPlatform[];
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
  const [show, setShow] = useState(false);
  const { getPresignedUrl } = useGetPresignedUrl();
  const { uploadPresignedUrlAsync } = useUploadPresignedUrl();

  const handleInputClick = (type: 'banner' | 'profile') => {
    inputRefs[type].current?.click();
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지만 업로드 가능합니다');
      return;
    }
    try {
      const data = await getPresignedUrl(file.name);
      await uploadPresignedUrlAsync(data.url, file);
      return data;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'profile') => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await handleImageUpload(file);

      if (type === 'banner' && data !== undefined) {
        setValue('bannerImage', data.keyName);
      } else if (type === 'profile' && data !== undefined) {
        setValue('profileImage', data.keyName);
      }
    }
  };

  const { mutate: patchUserInfoMutation } = useCustomMutation({
    mutationFn: async ({ nickname, profileImage, bannerImage }: { nickname: string; profileImage?: string; bannerImage?: string }) => {
      const updateData: { nickname: string; profileImage?: string; bannerImage?: string } = {
        nickname: nickname,
      };
      if (profileImage) updateData.profileImage = profileImage;
      if (bannerImage) updateData.bannerImage = bannerImage;

      return patchUserInfo(updateData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getUserInfo'],
      });
      setIsEdit(false);
      console.log(data);
    },
    onError: (error) => {
      console.log('Error object:', error);
    },
  });

  const onSubmit: SubmitHandler<TMyProfileValues> = (data) => {
    setIsEdit(false);
    const updateData: { nickname: string; profileImage?: string; bannerImage?: string } = { nickname: data.nickname };

    if (watchedProfileUrl !== userData?.result.profileImage) {
      updateData.profileImage = watchedProfileUrl;
    } else {
      updateData.profileImage = userData.result.profileImage.split('aws.com/')[1];
    }
    if (watchedBannerUrl !== userData?.result.bannerImage) {
      updateData.bannerImage = watchedBannerUrl;
    } else {
      updateData.bannerImage = userData.result.bannerImage.split('aws.com/')[1];
    }

    patchUserInfoMutation(updateData);
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
          <S.BannerImg onClick={() => handleInputClick('banner')} url={getImageUrl(watchedBannerUrl)} />
          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg onClick={() => handleInputClick('profile')}>
                  <Profile profileImg={getImageUrl(watchedProfileUrl)} />
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
                    value={watchedNickname} //수정 예정
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
          <S.BannerImg onClick={() => handleInputClick('banner')} url={getImageUrl(userData?.result.bannerImage || null)} />
          <S.Profile>
            <S.Container2>
              <S.ProfileUserInfo>
                <S.ProfileImg>
                  <Profile profileImg={getImageUrl(userData?.result.profileImage || null)} />
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
