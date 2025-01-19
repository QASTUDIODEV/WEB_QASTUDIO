import { uploadPresignedUrl } from '@/apis/images/images';

import { useCustomMutation } from '../common/useCustomMutation';

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

  const uploadPresignedUrlAsync = async (_presignedUrl: string, blob: File) => {
    return new Promise<void>((resolve, reject) => {
      uploadPresignedUrlMutate(
        { _presignedUrl, blob },
        {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        },
      );
    });
  };

  return {
    uploadPresignedUrlAsync,
    uploadPresignedUrlPending,
  };
};
