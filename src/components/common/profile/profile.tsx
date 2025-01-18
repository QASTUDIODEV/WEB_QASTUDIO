import * as S from '@/components/common/profile/profile.style';

import DefaultProfile from '@/assets/icons/defaultProfile.svg?react';

type TProfileProps = {
  profileImg?: string;
};
export default function Profile({ profileImg }: TProfileProps) {
  return <>{profileImg ? <S.Img src={profileImg} alt="Profile Image" /> : <DefaultProfile style={{ width: '100%', height: '100%' }} />}</>;
}
