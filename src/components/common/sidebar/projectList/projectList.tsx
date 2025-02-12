import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import useProjectList from '@/hooks/sidebar/sidebar';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import ProjectItems from '@/components/common/sidebar/projectItems/projectItems';
import * as S from '@/components/common/sidebar/projectList/projectList.style';

import Plus from '@/assets/icons/add.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function ProjectList() {
  const modalDispatch = useDispatch();
  const { useGetProjectList } = useProjectList();
  const { data: projectList } = useGetProjectList;
  const projects = projectList?.result.projectList || [];

  return (
    <>
      <S.Projects className="menu">
        <S.ProjectText>Projects</S.ProjectText>
        <Plus
          role="button"
          onClick={() => {
            modalDispatch(openModal({ modalType: MODAL_TYPES.CreateProjectModal, modalProps: { projectLength: projectList?.result.projectList.length } }));
          }}
        />
      </S.Projects>
      <ProjectItems projects={projects} />
    </>
  );
}
