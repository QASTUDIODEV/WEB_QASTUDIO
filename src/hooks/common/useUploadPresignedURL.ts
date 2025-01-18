import { uploadPresignedUrl } from '@/apis/images/images';

import { useCustomMutation } from './useCustomMutation';

type TUploadPresignedUrlParams = {
  _presignedUrl: string;
  blob: File;
};

export const useUploadPresignedUrl = () => {
  const { mutate: uploadPresignedUrlMutate, isPending: uploadPresignedUrlPending } = useCustomMutation({
    mutationFn: ({ _presignedUrl, blob }: TUploadPresignedUrlParams) => uploadPresignedUrl(_presignedUrl, blob),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    uploadPresignedUrlMutate,
    uploadPresignedUrlPending,
  };
};
