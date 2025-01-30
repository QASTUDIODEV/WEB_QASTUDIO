import { useState } from 'react';

import MyProfile from '@/components/mypage/myProfile/myProfile';
import ProjectList from '@/components/mypage/projectList/projectList';
import ProjectNum from '@/components/mypage/projectNum/projectNum';

import * as S from './mypage.style';

export default function MyPage() {
  const [projectNum, setProjectNum] = useState(0);
  return (
    <S.Container>
      <S.Title>My Page</S.Title>
      <MyProfile setProjectNum={setProjectNum} />
      <S.Projects>
        <ProjectNum projectNum={projectNum} />
        <ProjectList />
      </S.Projects>
    </S.Container>
  );
}
