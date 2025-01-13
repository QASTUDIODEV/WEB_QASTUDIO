import Project from '@/components/mypage/project/project';

import * as S from './projectList.style';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';

export default function ProjectList() {
  const projects = [
    { name: 'UMC_PM_DAYUMC_PM_DAYUMC_PM_DAYUMC_PM_DAYUMC_PM_DAY', participants: 12, date: '2025.01.09', id: 1 },
    { name: 'UMC_PM_DAY', participants: 23, date: '2025.01.09', id: 2 },
    { name: 'UMC_PM_DAY', participants: 102, date: '2025.01.09', id: 3 },
    { name: 'UMC_PM_DAY', participants: 243, date: '2025.01.09', id: 4 },
    { name: 'UMC_PM_DAY', participants: 719, date: '2025.01.09', id: 5 },
    { name: 'UMC_PM_DAY', participants: 48, date: '2025.01.09', id: 6 },
    { name: 'UMC_PM_DAY', participants: 1, date: '2025.01.09', id: 7 },
    // 테스트 용, 추후 삭제 예정
  ];
  return (
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
            {projects.map((project) => (
              <Project key={project.name} id={project.id} name={project.name} participants={project.participants} date={project.date} />
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
  );
}
