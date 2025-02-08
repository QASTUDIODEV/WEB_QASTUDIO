import useProjectList from '@/hooks/sidebar/sidebar';

import Profile from '@/components/common/profile/profile';
import * as S from '@/components/common/sidebar/profile/sideBarProfile.style';

import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Logo from '@/assets/icons/logo.svg?react';

type TUserProfile = {
  id: number;
  name: string;
  profileImg: string;
};

export default function SideBarProfile() {
  const { useGetSidebarUserInfo } = useProjectList();
  const { data: userInfo } = useGetSidebarUserInfo;
  const nickname = userInfo?.result.nickname;
  const profile = userInfo?.result.profileImage;
  const userProfile: TUserProfile = {
    id: 1,
    name: nickname || '',
    profileImg: profile || '',
  };

  return (
    <S.Container>
      <S.StyledNavLink to={`/project`}>
        <Logo width={25.6} height={25.6} />
      </S.StyledNavLink>
      <S.StyledNavLink to={`/mypage`}>
        <S.Profile>
          <S.SemiBox>
            <S.ProfileWrapper className="show project">
              <Profile profileImg={profile || ''} />
            </S.ProfileWrapper>
            <S.ProfileName className="menu">{userProfile.name}</S.ProfileName>
          </S.SemiBox>
          <ArrowRight className="menu" />
        </S.Profile>
      </S.StyledNavLink>
    </S.Container>
  );
}
