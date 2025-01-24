import { useState } from 'react';

import useDebounce from '@/hooks/common/useDebounce';

import SearchBar from '@/components/common/searchBar/searchBar';
import ProjectStatistics from '@/components/dashboard/projectStatistics/projectStatistics.tsx';
import Table from '@/components/dashboard/table/table';

import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  console.log(debouncedSearch);

  return (
    <S.Container>
      <ProjectStatistics />
      <S.ContentWrapper>
        <S.TableWrapper>
          <S.SearchBox>
            <SearchBar placeholder={'Search by name'} value={search} onChange={(e) => setSearch(e.target.value)} />
          </S.SearchBox>
          <Table />
        </S.TableWrapper>
      </S.ContentWrapper>
    </S.Container>
  );
}
