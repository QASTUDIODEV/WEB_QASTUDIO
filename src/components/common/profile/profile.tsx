import * as S from '@/components/common/profile/profile.style';

import DefaultProfileImg from '@/assets/icons/defaultProfile.svg';
import DefaultProjectImg from '@/assets/icons/DefaultProject.svg';

import DefaultProfile from '@/assets/icons/defaultProfile.svg?react';
import DefaultProject from '@/assets/icons/DefaultProject.svg?react';

type TProfileProps = {
  isProject?: boolean;
  profileImg?: string;
};
export default function Profile({ profileImg, isProject = false }: TProfileProps) {
  return (
    <>
      {profileImg ? (
        <S.Img
          src={profileImg}
          alt="Profile Image"
          onError={(e) => {
            isProject ? (e.currentTarget.src = DefaultProjectImg) : (e.currentTarget.src = DefaultProfileImg);
          }}
        />
      ) : isProject ? (
        <DefaultProject style={{ width: '100%', height: '100%' }} />
      ) : (
        <DefaultProfile style={{ width: '100%', height: '100%' }} />
      )}
    </>
  );
}
