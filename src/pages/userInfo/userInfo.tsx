import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ProjectNum from '@/components/mypage/projectNum/projectNum';
import OtherUserProjectList from '@/components/userInfo/otherUserProjectList/otherUserProjectList';
import UserProfile from '@/components/userInfo/userProfile/userProfile';

import * as S from './userInfo.style';

export default function UserInfo() {
  const [projectNum, setProjectNum] = useState(0);
  const [userName, setUsername] = useState('');
  const { userId } = useParams();
  return (
    <S.Container>
      <S.Title>{userName}'s My Page</S.Title>
      <UserProfile setUsername={setUsername} setProjectNum={setProjectNum} userId={userId || ''} />
      <S.Projects>
        <ProjectNum projectNum={projectNum} />
        <OtherUserProjectList userId={userId || ''} />
      </S.Projects>
    </S.Container>
  );
}
