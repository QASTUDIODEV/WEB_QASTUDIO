import type { ReactNode } from 'react';

import type { TEST_STATE } from '@/enums/enums';

import { getSelectName } from '@/utils/getSelectName';

import type { TFilter } from '@/hooks/dashborad/useTableFilter';
import useTableFilter from '@/hooks/dashborad/useTableFilter';

import * as S from './selectBox.style';

type TSelectBoxProps<T extends ReactNode> = {
  selectList: T[];
  filterKey: keyof TFilter;
};

export default function SelectBox<T extends ReactNode>({ selectList, filterKey }: TSelectBoxProps<T>) {
  const { setFilters } = useTableFilter();

  return (
    <S.Container>
      {selectList.map((e, idx) => (
        <li key={idx} onClick={() => setFilters({ [filterKey]: e })}>
          {filterKey === 'state' ? getSelectName(e as TEST_STATE) : e}
        </li>
      ))}
    </S.Container>
  );
}
