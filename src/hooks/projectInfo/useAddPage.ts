import { addPage } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation } from '../common/customQuery';

export default function useAddPage() {
  const usePage = useCoreMutation(addPage, {});
  return { usePage };
}
