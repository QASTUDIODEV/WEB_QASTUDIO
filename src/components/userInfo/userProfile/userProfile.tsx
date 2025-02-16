import type { TGetUserInfoResponse } from '@/types/userController/userController';

import Profile from '@/components/common/profile/profile';

import * as S from './userProfile.style';

type TMyprofile = {
  userData: TGetUserInfoResponse | undefined;
};

export default function UserProfile({ userData }: TMyprofile) {
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
