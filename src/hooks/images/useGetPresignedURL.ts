import { uploadSingleImg } from '@/apis/images/images';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

export const useGetPresignedUrl = () => {
  const { mutate: uploadSingleImgMutate } = useCustomMutation({
    mutationFn: ({ imgName }: { imgName: string }) => uploadSingleImg(imgName),
    onSuccess: (data) => {
      return data.result.url;
    },
    onError: (error) => {
      alert('이미지 업로드에 실패하였습니다');
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
  };
};
