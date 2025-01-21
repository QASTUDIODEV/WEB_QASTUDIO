import type { TGetErrorRequest } from '@/types/error/error';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getError } from '@/apis/error/error';

import { useCoreQuery } from '../common/customQuery';

export default function useGetError({ testId }: TGetErrorRequest) {
  return useCoreQuery([QUERY_KEYS.DASHBOARD.ERROR(testId)], () => getError({ testId }));
}
