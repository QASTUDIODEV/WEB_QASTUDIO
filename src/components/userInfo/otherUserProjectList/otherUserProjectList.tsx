import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { TUserProjectListResponse } from '@/types/userController/userController';

import useOtherUserProjects from '@/hooks/userInfo/useOtherUserProjects.ts';

import Project from '@/components/mypage/project/project';

import * as S from './otherUserProjectList.style.ts';

import ArrowLeft from '@/assets/icons/arrow_left_noColor.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_noColor.svg?react';

export default function OtherUserProjectList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useOtherUserProjects({ userId: userId || '', currentPage });

  const projectsData = data?.result.userProjectList;

  const goToNextPage = () => {
    if (!data?.result.isLast) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!data?.result.isFirst) {
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
          <tbody>
            {projectsData?.map((project: TUserProjectListResponse) => (
              <Project
                img={project.projectImage}
                key={project.projectId}
                id={project.projectId}
                name={project.projectName}
                participants={project.participant}
                date={project.lastModifiedDate}
                onClick={() => navigate(`/project/information/${project.projectId}`)}
              />
            ))}
          </tbody>
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
