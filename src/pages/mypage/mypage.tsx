import { useState } from 'react';

import useUserInfo from '@/hooks/mypage/useUserInfo';
import useProjects from '@/hooks/project/useProject';

import Loading from '@/components/common/loading/loading';
import MyProfile from '@/components/mypage/myProfile/myProfile';
import ProjectList from '@/components/mypage/projectList/projectList';
import ProjectNum from '@/components/mypage/projectNum/projectNum';

import * as S from './mypage.style';

export default function MyPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { useGetUserInfo } = useUserInfo();
  const { data: userData, isLoading: getUserInfoLoaidng } = useGetUserInfo;
  const { useGetMypageProjects } = useProjects(currentPage);
  const { data: projectData, isLoading: getProjectDataLoading } = useGetMypageProjects;
  const projectNum = projectData?.result.totalElements;
  if (getUserInfoLoaidng || getProjectDataLoading) {
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
        <ProjectList projectData={projectData} setCurrentPage={setCurrentPage} />
      </S.Projects>
    </S.Container>
  );
}
