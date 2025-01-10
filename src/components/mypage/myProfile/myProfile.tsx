import React, { useEffect, useRef, useState } from 'react';

import SocialLogo from '@/components/auth/socialLogo/socialLogo';
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

export default function MyProfile({ isEdit, nickname, setNickname, setIsEdit, socialLogin, unlinkedSocials }: TMyProfile) {
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const handleBannerInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    bannerInputRef.current?.click();
  };

  const handleProfileInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    profileInputRef.current?.click();
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleDoneClick = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    function handleInteraction(e: Event) {
      const target = e.target as HTMLElement;
      if (!containerRef?.current || !contentRef?.current) return;

      if (!containerRef.current.contains(target) && !contentRef.current.contains(target)) {
        setShow(false);
      }
    }
    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [containerRef, contentRef]);

  return (
    <S.ProfileWrapper>
      {/* 임시로 이미지 아무거나 넣어둠 */}
      <S.BannerImg onClick={handleBannerInputClick} url={'https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg'} />
      <input className="banner-image-upload" ref={bannerInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
      <S.Profile>
        {isEdit ? (
          <S.Container2>
            <S.ProfileUserInfo>
              <S.ProfileImg onClick={handleProfileInputClick} className="hover">
                <Profile />
                <S.ProfileEditBtn>
                  <ProfileEdit />
                </S.ProfileEditBtn>
              </S.ProfileImg>
              <input className="profile-image-upload" ref={profileInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
              <S.UserInfo>
                <Input value={nickname} width="268px" onChange={handleNicknameChange} />
                <S.AccoutWrapper>
                  <S.Account>email.email.com</S.Account>
                  <SocialLogo gap={8} size="small" id={socialLogin} disable={true} />
                  <div ref={containerRef}>
                    <S.PlusWrapper onClick={() => setShow(true)}>
                      <Plus />
                      {show && (
                        <div
                          style={{
                            display: 'flex',
                            backgroundColor: 'rgba(22, 24, 28, 1)',
                            border: '0.8px solid rgba(8, 38, 89, 1)',
                            borderRadius: '6.4px',
                            padding: '8px',
                            position: 'absolute',
                            bottom: '-55px',
                            left: '0',
                          }}
                          ref={contentRef}
                        >
                          <SocialLogo gap={8} size="small" id={unlinkedSocials} />
                        </div>
                      )}
                    </S.PlusWrapper>
                  </div>
                </S.AccoutWrapper>
              </S.UserInfo>
            </S.ProfileUserInfo>
            <S.ButtonWrapper>
              <Button type="small_square" color="default" disabled={false} icon={<Done />} iconPosition="left" onClick={handleDoneClick}>
                Done
              </Button>
            </S.ButtonWrapper>
          </S.Container2>
        ) : (
          <S.Container2>
            <S.ProfileUserInfo>
              <S.ProfileImg>
                <Profile />
              </S.ProfileImg>
              <S.UserInfo>
                <span>{nickname}</span>
                <S.AccoutWrapper>
                  <S.Account>email.email.com</S.Account>
                  <SocialLogo gap={8} size="small" disable={true} id={socialLogin} />
                </S.AccoutWrapper>
              </S.UserInfo>
            </S.ProfileUserInfo>
            <S.ButtonWrapper>
              <Button type="small_square" color="default" disabled={false} icon={<Edit />} iconPosition="left" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            </S.ButtonWrapper>
          </S.Container2>
        )}
      </S.Profile>
    </S.ProfileWrapper>
  );
}
