import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { TUserProjectListResponse } from '@/types/userController/userController';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getUserProjectList } from '@/apis/userController/userController';

import Project from '@/components/mypage/project/project';

import * as S from './projectList.style';

import ArrowLeft from '@/assets/icons/arrow_left_noColor.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_noColor.svg?react';

export default function ProjectList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useQuery({
    queryKey: QUERY_KEYS.GET_USER_PROJECT_LIST(currentPage),
    queryFn: () => getUserProjectList({ page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const projectsData = data?.result.userProjectList;

  const goToNextPage = () => {
    if (data?.result.isLast) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (data?.result.isFirst) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <S.ProjectList>
      <S.TableWrapper>
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
            {projectsData?.map((project: TUserProjectListResponse) => (
              <Project
                key={project.projectId}
                id={project.projectId}
                name={project.projectName}
                participants={project.participant}
                date={project.lastModifiedDate}
                onClick={() => navigate(`/project/information/${project.projectId}`)}
              />
            ))}
          </S.TBody>
        </S.Table>
      </S.TableWrapper>

      <div>
        <S.Buttons>
          {!data?.result.isFirst ? (
            <S.Button $disable={false}>
              <ArrowLeft stroke={'#DFE8F9'} onClick={goToPreviousPage} />
            </S.Button>
          ) : (
            <S.Button $disable={true}>
              <ArrowLeft stroke={'#e9e8f91a'} />
            </S.Button>
          )}
          {!data?.result.isLast ? (
            <S.Button $disable={false}>
              <ArrowRight stroke={'#DFE8F9'} onClick={goToNextPage} />
            </S.Button>
          ) : (
            <S.Button $disable={true}>
              <ArrowRight stroke={'#e9e8f91a'} />
            </S.Button>
          )}
        </S.Buttons>
      </div>
    </S.ProjectList>
  );
}
