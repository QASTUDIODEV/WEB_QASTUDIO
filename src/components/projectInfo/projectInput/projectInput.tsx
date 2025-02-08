import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';

import Edit from '@/assets/icons/edit.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';

type TProjectIntroProps = {
  result:
    | {
        projectId: number;
        projectImage: string;
        projectName: string;
        projectUrl: string;
        introduction: string;
        viewType: string;
        developmentSkill: string;
        assistantId: string;
      }
    | undefined;
};

export default function ProjectInfoPage({ result }: TProjectIntroProps) {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(result?.introduction || '');
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
    setContent(result?.introduction || '');
  }, [result?.projectId]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxRows = 2;
    const textarea = e.target;

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight, 10);
    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);
    if (currentRows > maxRows) {
      return;
    }
    preContent.current = e.target.value;
  };
  return (
    <>
      <S.Title>Introduction to the Project</S.Title>
      {!isEdit ? (
        <>
          <S.Text>{content}</S.Text>
          <S.Wrapper bottom="16px" right="24px">
            <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          </S.Wrapper>
        </>
      ) : (
        <>
          <S.Input onChange={(e) => handleInputChange(e)} value={preContent.current} rows={2} />
          <S.Wrapper bottom="16px" right="24px">
            <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={handleEdit}>
              Done
            </Button>
          </S.Wrapper>
        </>
      )}
    </>
  );
}
