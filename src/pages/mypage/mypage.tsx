import { useState } from 'react';

import Profile from '@/components/common/profile/profile';
import MyProfile from '@/components/mypage/myProfile/myProfile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Package from '@/assets/icons/package.svg?react';
import * as S from '@/pages/mypage/mypage.style';

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
  const projects = [
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    // 테스트 용, 추후 삭제 예정
  ];
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
        <S.ProjectNum>
          <Package />
          <div className="ProjectNumber">3</div>
          <span>Projects in progress</span>
        </S.ProjectNum>
        <S.ProjectList>
          <div style={{ flex: '1' }}>
            <S.Table>
              <thead>
                <tr>
                  <S.TH className="right">Project Name</S.TH>
                  <S.TH className="right">Participants</S.TH>
                  <S.TH>Last Modified Date</S.TH>
                </tr>
              </thead>
              <S.TBody>
                {projects.map((project, index) => (
                  <S.TR key={index}>
                    <S.TD>
                      <S.ProjectNameTD>
                        <div className="ProfileWrapper">
                          <Profile />
                        </div>
                        {project.name}
                      </S.ProjectNameTD>
                    </S.TD>
                    <S.TD>{project.participants}</S.TD>
                    <S.TD>{project.date}</S.TD>
                  </S.TR>
                ))}
              </S.TBody>
            </S.Table>
          </div>

          <S.Buttons>
            {/* 이전/다음 페이지가 없는 경우 #DFE8F9 10%로 설정 */}
            <ArrowLeft />
            <ArrowRight />
          </S.Buttons>
        </S.ProjectList>
      </S.Projects>
    </S.Container>
  );
}
