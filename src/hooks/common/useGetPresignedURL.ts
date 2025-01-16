// useUploadImage.ts: 이미지 업로드 훅
import { useState } from 'react';

import { uploadSingleImg } from '@/apis/images/images';

import { useCustomMutation } from './useCustomMutation';

export const useGetPresignedUrl = () => {
  const [presignedUrl, setUrl] = useState<string>('');

  const { mutate: uploadSingleImgMutate, isPending: uploadSingleImgPending } = useCustomMutation({
    mutationFn: ({ imgName }: { imgName: string }) => uploadSingleImg(imgName),
    onSuccess: (data) => {
      setUrl(data.result.url);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    uploadSingleImgMutate,
    uploadSingleImgPending,
    presignedUrl,
  };
};
