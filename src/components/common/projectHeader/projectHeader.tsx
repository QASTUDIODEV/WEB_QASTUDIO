import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import type { AxiosError } from 'axios';

import { DEVICE, STACK } from '@/enums/enums';

import useProjectExtractInfo from '@/hooks/projectInfo/useProjectExtractInfo';

import ProjectTitle from '@/components/common/projectTitle/projectTitle';

import * as S from './projectHeader.style';
import Button from '../button/button';
import Loading from '../loading/loading';
import { MODAL_TYPES } from '../modalProvider/modalProvider';

import Goto from '@/assets/icons/arrow_goto.svg?react';
import Delete from '@/assets/icons/del.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import { Circle1, Circle2, Circle3, Circle4 } from '@/layouts/auth/auth.style';
import { Error } from '@/pages/addProject/addProject.style';
import NoAuthority from '@/pages/noAuthority/noAuthority';
import { openModal } from '@/slices/modalSlice';

type TAxiosResponseError = AxiosError<{
  code: string;
  message: string;
  error: string;
}>;

export default function ProjectHeader() {
  const { projectId } = useParams();
  const { data, isLoading, error } = useProjectExtractInfo(Number(projectId));
  const location = useLocation();
  const isInformationPage = location.pathname.startsWith('/project/information/');

  const dispatch = useDispatch();
  if (error) {
    const errorCode = (error as TAxiosResponseError)?.response?.data?.code;
    if (errorCode === 'PROJECT403') {
      return <NoAuthority />;
    } else {
      return <Error />;
    }
  }
  if (isLoading) {
    return (
      <S.Container>
        <Loading />
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
      </S.Container>
    );
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
        {isInformationPage && data?.result.isLeader && (
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
