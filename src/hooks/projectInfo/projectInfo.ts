import { uploadZipFile } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation } from '../common/customQuery';

export default function useUploadZipFile() {
  const useUploadFile = useCoreMutation(uploadZipFile, {});
  return { useUploadFile };
}
