import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { addProject, getProjectList, getUserSidebarInfo } from '@/apis/sidebar/sidebar';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export default function useProjectList() {
  const useGetProjectList = useCoreQuery(QUERY_KEYS.PROJECT_LIST, () => getProjectList());
  const useAddProject = useCoreMutation(addProject, {});
  const useGetSidebarUserInfo = useCoreQuery(QUERY_KEYS.GET_USER_SIDEBAR_INFO, () => getUserSidebarInfo());
  return { useGetProjectList, useAddProject, useGetSidebarUserInfo };
}
