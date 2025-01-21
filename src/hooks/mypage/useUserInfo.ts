import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getUserInfo, patchUserInfo } from '@/apis/userController/userController';

import { queryClient } from '../../apis/queryClient';
import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export default function useUserInfo() {
  const useGetUserInfo = useCoreQuery(QUERY_KEYS.GET_USER_INFO, () => getUserInfo());
  const usePatchUserInfo = useCoreMutation(patchUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_USER_INFO,
      });
    },
    onError: () => {},
  });
  return { useGetUserInfo, usePatchUserInfo };
}
