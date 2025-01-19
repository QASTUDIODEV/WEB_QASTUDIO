import React, { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { TMyProfileValues, TSocialPlatform } from '@/types/mypage/mypage';

import findUnlinkedSocials from '@/utils/findUnlinkedSocials';
import { myPageScehma } from '@/utils/validate';

import { useGetPresignedUrl } from '@/hooks/images/useGetPresignedURL';
import { useUploadPresignedUrl } from '@/hooks/images/useUploadPresignedURL';

import SocialLogo from '@/components/auth/socialLogo/socialLogo';
import Button from '@/components/common/button/button';
import Profile from '@/components/common/profile/profile';

import * as S from './MyProfile.style';
import { InputModule } from '../../auth/module/module';

import Plus from '@/assets/icons/add.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import ProfileEdit from '@/assets/icons/profileEdit.svg?react';

export default function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  // const { userData } = useGetUserInfo();
  const socialLogin: TSocialPlatform[] = ['github', 'kakao']; // 수정 예정
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
    defaultValues: {
      nickname: '닉네임',
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
        setValue('bannerImage', 'https://qastudio-s3.s3.ap-northeast-2.amazonaws.com/' + data.keyName);
      } else if (type === 'profile' && data !== undefined) {
        setValue('profileImage', 'https://qastudio-s3.s3.ap-northeast-2.amazonaws.com/' + data.keyName);
      }
    }
  };

  const onSubmit: SubmitHandler<TMyProfileValues> = (data) => {
    console.log(data);
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
                <Button type="small_square" color="default" disabled={!!errors.nickname?.message} icon={<Done />} onClick={handleSubmit(onSubmit)}>
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
                  <span>{watchedNickname}</span>
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
