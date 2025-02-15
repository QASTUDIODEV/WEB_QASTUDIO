import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { DEVICE, STACK } from '@/enums/enums';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import ProjectTitle from '@/components/common/projectTitle/projectTitle';

import * as S from './projectHeader.style';
import Button from '../button/button';
import { MODAL_TYPES } from '../modalProvider/modalProvider';

import Goto from '@/assets/icons/arrow_goto.svg?react';
import Delete from '@/assets/icons/del.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import { openModal } from '@/slices/modalSlice';

export default function ProjectHeader() {
  const { projectId } = useParams();
  const { useProjectExtractInfo } = useProjectInfo({ projectId: Number(projectId) });
  const { data, isLoading } = useProjectExtractInfo;
  const location = useLocation();
  const isInformationPage = location.pathname.startsWith('/project/information/');

  const dispatch = useDispatch();

  if (isLoading) {
    return;
  }
  if (!projectId) {
    return;
  }
  return (
    <S.Header>
      <S.LeftSideComponents>
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
      </S.LeftSideComponents>
      <S.RightSideButton>
        {isInformationPage && (
          <S.ButtonWrapper>
            <Button
              type="normal"
              color="default"
              icon={<Edit />}
              iconPosition="left"
              onClick={() => dispatch(openModal({ modalType: MODAL_TYPES.EditProjectModal }))}
            >
              Edit
            </Button>
            <Button
              type="normal"
              color="default"
              icon={<Delete />}
              iconPosition="left"
              onClick={() => dispatch(openModal({ modalType: MODAL_TYPES.DeleteProjectModal }))}
            >
              Delete
            </Button>
          </S.ButtonWrapper>
        )}
      </S.RightSideButton>
    </S.Header>
  );
}
