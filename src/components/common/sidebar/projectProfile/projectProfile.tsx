import * as S from '@/components/common/sidebar/projectProfile/projectProfile.style';

import DefaultLogo from '/public/icons/logo.svg?react';

type TProfileProps = {
  profileImg?: string;
};
export default function ProjectProfile({ profileImg }: TProfileProps) {
  return <>{profileImg ? <S.Img src={profileImg} alt="Profile Image" /> : <DefaultLogo style={{ width: '100%', height: '100%' }} />}</>;
}
