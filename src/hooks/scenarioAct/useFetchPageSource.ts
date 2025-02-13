import { fetchPageSource } from '@/apis/scenarioAct/scenarioAct';

import { useCoreMutation } from '@/hooks/common/customQuery';

export default function useFetchPageSource() {
  const useFetchInitialPage = useCoreMutation(fetchPageSource);

  return { useFetchInitialPage };
}
