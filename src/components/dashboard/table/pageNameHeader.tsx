import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import DownArrow from '@/assets/icons/arrow_down.svg?react';
import UpArrow from '@/assets/icons/arrow_up.svg?react';

interface IProps {
  onSelect: (value: string) => void;
}

export default function PageNameHeader({ onSelect }: IProps) {
  const [isClicked, setIsClicked] = useState(false);

  const { projectId } = useParams();
  const { useGetPageSummary } = useProjectInfo({ projectId: Number(projectId) });
  const { data } = useGetPageSummary;
  const PAGE_NAMES = data?.result.pageSummaryList.map((page) => page.pageName) ?? [];

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>Page</p>
        {isClicked ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <SelectBox<string> selectList={PAGE_NAMES} onSelect={onSelect} />}
    </S.HeaderWrapper>
  );
}
