import { useEffect, useState } from 'react';

import useDebounce from '@/hooks/common/useDebounce.ts';
import type { TFilter } from '@/hooks/dashborad/useTableFilter.ts';

import * as S from './searchBar.style';

import SearchIcon from '@/assets/icons/search.svg?react';

interface IProps {
  setFilters: (filter: TFilter) => void;
}

export default function SearchBar({ setFilters }: IProps) {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setFilters({
      testName: debouncedSearch,
    });
  }, [debouncedSearch]);

  return (
    <S.Container>
      <input type="text" placeholder={'Search by name'} value={search} onChange={(e) => setSearch(e.target.value)} />
      <SearchIcon width={'14px'} height={'14px'} />
    </S.Container>
  );
}
