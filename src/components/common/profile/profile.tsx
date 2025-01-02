import * as S from '@/components/common/profile/profile.style';

type TProfileProps = {
  profileImg: string;
};
export default function Profile({ profileImg }: TProfileProps) {
  return <S.Img src={profileImg} alt="Profile Image" />;
}
