import { useState } from 'react';
import { useParams } from 'react-router-dom';

import useDebounce from '@/hooks/common/useDebounce';
import useGetStatistics from '@/hooks/test/useGetStatistics';

import Loading from '@/components/common/loading/loading';
import SearchBar from '@/components/common/searchBar/searchBar';
import ProjectStatistics from '@/components/dashboard/projectStatistics/projectStatistics';
import Table from '@/components/dashboard/table/table';

import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const { projectId } = useParams();
  const { data: statisticsData, isPending } = useGetStatistics({ projectId: Number(projectId) });

  console.log(debouncedSearch);

  if (isPending) {
    return (
      <S.Container>
        <Loading />
      </S.Container>
    );
  }

  if (statisticsData)
    return (
      <S.Container>
        <ProjectStatistics data={statisticsData} />
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
