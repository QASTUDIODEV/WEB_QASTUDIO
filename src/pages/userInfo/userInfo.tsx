import { useParams } from 'react-router-dom';

import useOtherUserInfo from '@/hooks/userInfo/useOtherUserInfo';

import ProjectNum from '@/components/mypage/projectNum/projectNum';
import OtherUserProjectList from '@/components/userInfo/otherUserProjectList/otherUserProjectList';
import UserProfile from '@/components/userInfo/userProfile/userProfile';

import * as S from './userInfo.style';

export default function UserInfo() {
  const { userId } = useParams();
  const { useGetOtherUserInfo } = useOtherUserInfo({ userId: userId || '' });
  const { data: userData } = useGetOtherUserInfo;

  return (
    <S.Container>
      <S.Title>{userData?.result.nickname}'s My Page</S.Title>
      <UserProfile userData={userData} />
      <S.Projects>
        <ProjectNum projectNum={userData?.result.projectCnt} />
        <OtherUserProjectList />
      </S.Projects>
    </S.Container>
  );
}
