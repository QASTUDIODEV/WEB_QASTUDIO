import { getSinglePresignedUrl, uploadImageToPresignedUrl } from '@/apis/images/images';

import { useCoreMutation } from '../common/customQuery';

export const useImage = () => {
  const useImageToUploadPresignedUrl = useCoreMutation(uploadImageToPresignedUrl, {});
  const useGetPresignedUrl = useCoreMutation(getSinglePresignedUrl, {});
  return {
    useImageToUploadPresignedUrl,
    useGetPresignedUrl,
  };
};
