import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const useProjectId = () => {
  const { projectId: id } = useParams();
  const projectId = useMemo(() => Number(id), [id]);

  return projectId;
};
