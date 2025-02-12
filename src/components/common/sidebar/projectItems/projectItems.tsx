import type { TProjectDTO } from '@/types/sidebar/sidebar';

import Project from '@/components/common/sidebar/project/project.tsx';
import * as S from '@/components/common/sidebar/projectItems/projectItems.style';

type TProjectItemProps = {
  projects: TProjectDTO[];
};

export default function ProjectItems({ projects }: TProjectItemProps) {
  return (
    <S.ProjectList>
      <div>{projects && projects.map((project) => <Project {...project} key={project.projectId as number} />)}</div>
    </S.ProjectList>
  );
}
