import Button from '@/components/common/button/button';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Package from '@/assets/icons/package.svg?react';
import * as S from '@/pages/mypage/mypage.style';

export default function MyPage() {
  const projects = [
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    // 추가 항목을 여기에 넣을 수 있습니다.
  ];

  return (
    <S.Container>
      <span>My Page</span>
      <S.ProfileWrapper>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '112px' }}>
            <Profile />
          </div>
          <S.UserInfo>
            <span>eunji</span>
            <S.Account>email.email.com</S.Account>
          </S.UserInfo>
        </div>

        <div>
          <Button type="small_square" color="default" disabled={false} icon={<Edit />} iconPosition="left">
            Edit
          </Button>
        </div>
      </S.ProfileWrapper>

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
                  <S.TH style={{ paddingRight: '2rem' }}>Project Name</S.TH>
                  <S.TH style={{ paddingRight: '2rem' }}>Participants</S.TH>
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
            <ArrowLeft />
            <ArrowRight />
          </S.Buttons>
        </S.ProjectList>
      </S.Projects>
    </S.Container>
  );
}
