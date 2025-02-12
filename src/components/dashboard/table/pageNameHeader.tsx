import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TFilter } from '@/hooks/dashborad/useTableFilter.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import { DownArrow, UpArrow } from '@/assets/icons';

interface IProps {
  setFilters: (filter: TFilter) => void;
}

export default function PageNameHeader({ setFilters }: IProps) {
  const [isClicked, setIsClicked] = useState(false);
  const { projectId } = useParams();
  const { useGetPageSummary } = useProjectInfo({ projectId: Number(projectId) });
  const { data } = useGetPageSummary;

  const PAGE_NAMES = ['All', ...(data?.result.pageSummaryList.map((page) => page.pageName) ?? [])];

  return (
    <S.HeaderWrapper>
      <S.ButtonHeader onClick={() => setIsClicked((prev) => !prev)}>
        <p>Page</p>
        {isClicked ? <UpArrow /> : <DownArrow />}
      </S.ButtonHeader>
      {isClicked && <SelectBox<string> selectList={PAGE_NAMES} setFilters={setFilters} filterKey={'pageName'} />}
    </S.HeaderWrapper>
  );
}
