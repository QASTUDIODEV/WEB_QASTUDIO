import { useState } from 'react';

import { useProjectId } from '@/hooks/common/useProjectId.ts';
import type { TFilter } from '@/hooks/dashborad/useTableFilter.ts';
import useGetPageSummary from '@/hooks/projectInfo/useGetPageSummary';

import SelectBox from '@/components/dashboard/selectBox/selectBox';
import * as S from '@/components/dashboard/table/table.style';

import { DownArrow, UpArrow } from '@/assets/icons';

interface IProps {
  setFilters: (filter: TFilter) => void;
}

export default function PageNameHeader({ setFilters }: IProps) {
  const [isClicked, setIsClicked] = useState(false);
  const projectId = useProjectId();
  const { data } = useGetPageSummary(projectId);

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
