import { useState } from 'react';

import MyProfile from '@/components/mypage/myProfile/myProfile';
import ProjectList from '@/components/mypage/projectList/projectList';
import ProjectNum from '@/components/mypage/projectNum/projectNum';

import * as S from './mypage.style';

type TSocialPlatform = 'github' | 'kakao' | 'google';

function findUnlinkedSocials(linkedAccounts: TSocialPlatform[]): TSocialPlatform[] {
  const allSocialPlatforms: TSocialPlatform[] = ['github', 'kakao', 'google'];
  return allSocialPlatforms.filter((platform) => !linkedAccounts.includes(platform));
}

export default function MyPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState('기존 닉네임');
  const socialLogin: TSocialPlatform[] = ['github'];
  const unlinkedSocials = findUnlinkedSocials(socialLogin);

  return (
    <S.Container>
      <S.Title>My Page</S.Title>
      <MyProfile
        isEdit={isEdit}
        nickname={nickname}
        setNickname={setNickname}
        setIsEdit={setIsEdit}
        socialLogin={socialLogin}
        unlinkedSocials={unlinkedSocials}
      />
      <S.Projects>
        <ProjectNum />
        <ProjectList />
      </S.Projects>
    </S.Container>
  );
}
