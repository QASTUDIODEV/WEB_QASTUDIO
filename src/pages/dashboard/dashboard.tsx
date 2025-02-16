import { useProjectId } from '@/hooks/common/useProjectId.ts';
import useGetStatistics from '@/hooks/test/useGetStatistics';

import Loading from '@/components/common/loading/loading';
import ProjectStatistics from '@/components/dashboard/projectStatistics/projectStatistics';
import Table from '@/components/dashboard/table/table';

import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const projectId = useProjectId();
  const { data: statisticsData, isPending } = useGetStatistics({ projectId });

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
            <Table />
          </S.TableWrapper>
        </S.ContentWrapper>
      </S.Container>
    );
}
