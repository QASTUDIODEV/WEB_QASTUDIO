import { toast } from 'sonner';

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
          onError: (error) => {
            toast.error('파일 업로드에 실패했습니다. 다시 시도해주세요.');
            reject(error);
          },
        },
      );
    });
  };

  return {
    uploadPresignedUrlAsync,
    uploadPresignedUrlPending,
  };
};
