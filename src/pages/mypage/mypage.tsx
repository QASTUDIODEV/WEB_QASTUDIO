import useUserInfo from '@/hooks/mypage/useUserInfo';

import Loading from '@/components/common/loading/loading';
import MyProfile from '@/components/mypage/myProfile/myProfile';
import ProjectList from '@/components/mypage/projectList/projectList';
import ProjectNum from '@/components/mypage/projectNum/projectNum';

import * as S from './mypage.style';

export default function MyPage() {
  const { useGetUserInfo } = useUserInfo();
  const { data: userData, isLoading: getUserInfoLoaidng } = useGetUserInfo;

  const projectNum = userData?.result.projectCnt;
  if (getUserInfoLoaidng) {
    return (
      <S.LoadingContainer>
        <Loading />
      </S.LoadingContainer>
    );
  }
  return (
    <S.Container>
      <S.Title>My Page</S.Title>
      <MyProfile userData={userData} isLoading={getUserInfoLoaidng} />
      <S.Projects>
        <ProjectNum projectNum={projectNum} />
        <ProjectList />
      </S.Projects>
    </S.Container>
  );
}
