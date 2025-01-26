import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { addProject, getProjectList } from '@/apis/sidebar/sidebar';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export default function useProjectList() {
  const useGetProjectList = useCoreQuery(QUERY_KEYS.PROJECT_LIST, () => getProjectList());
  const useAddProject = useCoreMutation(addProject, {});
  return { useGetProjectList, useAddProject };
}
