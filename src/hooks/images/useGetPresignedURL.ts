import { uploadSingleImg } from '@/apis/images/images';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

export const useGetPresignedUrl = () => {
  const { mutate: uploadSingleImgMutate, isPending: uploadSingleImgPending } = useCustomMutation({
    mutationFn: ({ imgName }: { imgName: string }) => uploadSingleImg(imgName),
    onSuccess: (data) => {
      console.log(data.result.url);
      return data.result.url; // 반환된 값은 URL이어야 합니다.
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const getPresignedUrl = async (imgName: string) => {
    return new Promise<string>((resolve, reject) => {
      uploadSingleImgMutate(
        { imgName },
        {
          onSuccess: (data) => resolve(data.result.url),
          onError: (error) => reject(error),
        },
      );
    });
  };
  return {
    getPresignedUrl,
    uploadSingleImgPending,
  };
};
