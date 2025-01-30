import { uploadZipFile } from '@/apis/projectInfo/uploadZipFile';

import { useCoreMutation } from '../common/customQuery';

export function useUploadZipFile() {
  const useUploadFile = useCoreMutation(uploadZipFile, {});
  return { useUploadFile };
}
