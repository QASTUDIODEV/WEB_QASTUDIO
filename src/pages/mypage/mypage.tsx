import MyProfile from '@/components/mypage/myProfile/myProfile';
import ProjectList from '@/components/mypage/projectList/projectList';
import ProjectNum from '@/components/mypage/projectNum/projectNum';

import * as S from './mypage.style';

export default function MyPage() {
  return (
    <S.Container>
      <S.Title>My Page</S.Title>
      <MyProfile />
      <S.Projects>
        <ProjectNum />
        <ProjectList />
      </S.Projects>
    </S.Container>
  );
}
