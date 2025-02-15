import { useLocation, useParams } from 'react-router-dom';

import { DEVICE, STACK } from '@/enums/enums';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import ProjectTitle from '@/components/common/projectTitle/projectTitle';

import * as S from './projectHeader.style';
import Button from '../button/button';

import Goto from '@/assets/icons/arrow_goto.svg?react';

export default function ProjectHeader() {
  const { projectId } = useParams();
  const { useProjectExtractInfo } = useProjectInfo({ projectId: Number(projectId) });
  const { data, isLoading } = useProjectExtractInfo;
  const location = useLocation();
  const isInformationPage = location.pathname.startsWith('/project/information/');
  if (isLoading) {
    return;
  }
  if (!projectId) {
    return;
  }
  return (
    <S.Header>
      <ProjectTitle
        profileImg={data?.result.projectImage}
        title={data?.result.projectName}
        device={data?.result.viewType ? DEVICE[data.result.viewType] : undefined}
        stack={data?.result.developmentSkill ? STACK[data.result.developmentSkill] : undefined}
      />
      {isInformationPage && (
        <S.ButtonWrapper>
          <Button
            type="normal"
            color="default"
            icon={<Goto />}
            iconPosition="right"
            onClick={() => {
              if (data?.result?.projectUrl) {
                window.location.href = data?.result.projectUrl;
              }
            }}
          >
            Go to Site
          </Button>
        </S.ButtonWrapper>
      )}
    </S.Header>
  );
}
