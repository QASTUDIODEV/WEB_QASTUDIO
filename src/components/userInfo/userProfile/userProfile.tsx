import React, { useEffect } from 'react';

import useOtherUserInfo from '@/hooks/userInfo/useOtherUserInfo';

import Profile from '@/components/common/profile/profile';

import * as S from './userProfile.style';

type TMyprofile = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setProjectNum: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
};

export default function UserProfile({ setUsername, setProjectNum, userId }: TMyprofile) {
  const { useGetOtherUserInfo } = useOtherUserInfo({ userId: userId || '', currentPage: 0 });
  const { data: userData } = useGetOtherUserInfo;

  useEffect(() => {
    if (userData) {
      setProjectNum(userData.result.projectCnt);
      setUsername(userData?.result.nickname);
    }
  }, [userData]);

  return (
    <>
      <S.ProfileWrapper>
        <S.BannerImg url={userData?.result.bannerImage} />
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
                </S.AccoutWrapper>
              </S.UserInfo>
            </S.ProfileUserInfo>
          </S.Container2>
        </S.Profile>
      </S.ProfileWrapper>
    </>
  );
}
