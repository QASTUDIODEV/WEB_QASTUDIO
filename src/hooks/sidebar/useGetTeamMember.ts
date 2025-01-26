import type { TRequestTeamMember } from '@/types/sidebar/sidebar';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getTeamMember } from '@/apis/sidebar/sidebar';

import { useCoreQuery } from '../common/customQuery';

export default function useTeamMember({ projectId, email }: TRequestTeamMember) {
  const useGetTeamMember = useCoreQuery(QUERY_KEYS.TEAM_MEMBER({ projectId, email }), () => getTeamMember({ projectId, email }));
  return { useGetTeamMember };
}
