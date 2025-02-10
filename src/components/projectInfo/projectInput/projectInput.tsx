import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { TInfoDTO } from '@/types/projectInfo/projectInfo';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import * as S from '@/components/projectInfo/projectInput/projectInput.style';

import Edit from '@/assets/icons/edit.svg?react';

export default function ProjectInput({ result }: TInfoDTO) {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const preContent = useRef(result?.introduction || '');
  const { useEditIntroduce } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { mutate: editIntroduce } = useEditIntroduce;
  const handleEdit = () => {
    setIsEdit(false);
    editIntroduce(
      {
        projectId: Number(result?.projectId),
        introduce: preContent.current,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getProjectInfo', Number(result?.projectId)] });
        },
      },
    );
  };
  useEffect(() => {
    preContent.current = result?.introduction || '';
  }, [result?.projectId]);
  return (
    <>
      <S.Title>Introduction to the Project</S.Title>
      {!isEdit ? (
        <>
          <S.Text>{result?.introduction}</S.Text>
          <S.Wrapper>
            <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          </S.Wrapper>
        </>
      ) : (
        <>
          <S.Input onChange={(e) => (preContent.current = e.target.value)} rows={3} />
          <S.Wrapper>
            <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={handleEdit}>
              Done
            </Button>
          </S.Wrapper>
        </>
      )}
    </>
  );
}
