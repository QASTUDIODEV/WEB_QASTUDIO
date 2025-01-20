import { uploadSingleImg } from '@/apis/images/images';

import { useCustomMutation } from '@/hooks/common/useCustomMutation';

export const useGetPresignedUrl = () => {
  const { mutate: uploadSingleImgMutate, isPending: uploadSingleImgPending } = useCustomMutation({
    mutationFn: ({ imgName }: { imgName: string }) => uploadSingleImg(imgName),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      alert('이미지 업로드에 실패하였습니다');
      console.error(error);
    },
  });

  const getPresignedUrl = async (imgName: string) => {
    return new Promise<{ url: string; keyName: string }>((resolve, reject) => {
      uploadSingleImgMutate(
        { imgName },
        {
          onSuccess: (data) => resolve({ url: data.result.url, keyName: data.result.keyName }),
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
