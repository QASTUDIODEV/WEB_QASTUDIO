import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Project from '@/components/mypage/project/project';

import * as S from './projectList.style';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';

export default function ProjectList() {
  const navigate = useNavigate();
  const projectsData = [
    { name: 'QASTUDIO', participants: 12, date: '2025.01.09', id: 1 },
    { name: '초대박적인프로젝트', participants: 23, date: '2025.01.09', id: 2 },
    { name: '엄청난 프로젝트', participants: 102, date: '2025.01.09', id: 3 },
    { name: '혁신적인 프로젝트', participants: 243, date: '2025.01.09', id: 4 },
    { name: '세상에 이런일이', participants: 719, date: '2025.01.09', id: 5 },
    { name: '고양이가 세상 지배', participants: 48, date: '2025.01.09', id: 6 },
    { name: '귀여운게 제일 좋아', participants: 1, date: '2025.01.09', id: 7 },
    { name: '감자같은인생 퍽퍽하다는 뜻임', participants: 13, date: '2025.01.09', id: 8 },
    { name: '우리팀짱', participants: 89, date: '2025.01.09', id: 9 },
    { name: '망곰이 기여웡', participants: 51, date: '2025.01.09', id: 10 },
    // 테스트 용, 추후 삭제 예정
  ];

  const pageSize = 7; // 한 페이지에 표시할 프로젝트 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const totalPages = Math.ceil(projectsData.length / pageSize); // 전체 페이지 수
  const haveNext = currentPage < totalPages; // 다음 페이지가 있는지 확인
  const havePrevious = currentPage > 1; // 이전 페이지가 있는지 확인

  // 현재 페이지에 맞는 프로젝트 데이터만 가져오기
  const currentProjects = projectsData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 페이지 이동 함수
  const goToNextPage = () => {
    if (haveNext) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (havePrevious) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <S.ProjectList>
      <div style={{ flex: '1' }}>
        <S.Table>
          <thead>
            <tr>
              <S.TH>Project Name</S.TH>
              <S.TH className="blank" />
              <S.TH>Participants</S.TH>
              <S.TH className="blank" />
              <S.TH>Last Modified Date</S.TH>
            </tr>
          </thead>
          <S.TBody>
            {currentProjects.map((project) => (
              <Project
                key={project.id}
                id={project.id}
                name={project.name}
                participants={project.participants}
                date={project.date}
                onClick={() => navigate(`/project/information/${project.id}`)}
              />
            ))}
          </S.TBody>
        </S.Table>
      </div>

      <S.Buttons>
        {havePrevious ? <ArrowLeft stroke={'#DFE8F9'} onClick={goToPreviousPage} /> : <ArrowLeft stroke={'#e9e8f91a'} />}
        {haveNext ? <ArrowRight stroke={'#DFE8F9'} onClick={goToNextPage} /> : <ArrowRight stroke={'#e9e8f91a'} />}
      </S.Buttons>
    </S.ProjectList>
  );
}
