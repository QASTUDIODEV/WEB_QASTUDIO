import type { ReactNode } from 'react';

import type { TEST_STATE } from '@/enums/enums';

import { getSelectName } from '@/utils/getSelectName';

import type { TFilter } from '@/hooks/dashborad/useTableFilter';

import * as S from './selectBox.style';

type TSelectBoxProps<T extends ReactNode> = {
  selectList: T[];
  filterKey: keyof TFilter;
  setFilters: (filter: TFilter) => void;
};

export default function SelectBox<T extends ReactNode>({ selectList, setFilters, filterKey }: TSelectBoxProps<T>) {
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
