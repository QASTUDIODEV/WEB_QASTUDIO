import * as S from '@/components/common/sidebar/projectProfile/projectProfile.style';

type TProfileProps = {
  profileImg?: string;
};
export default function ProjectProfile({ profileImg }: TProfileProps) {
  return <>{profileImg && <S.Img src={profileImg} alt="Profile Image" />}</>;
}
