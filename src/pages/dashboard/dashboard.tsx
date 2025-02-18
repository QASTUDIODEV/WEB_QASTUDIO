import { useProjectId } from '@/hooks/common/useProjectId.ts';
import useGetStatistics from '@/hooks/test/useGetStatistics';

import ProjectStatistics from '@/components/dashboard/projectStatistics/projectStatistics';
import Table from '@/components/dashboard/table/table';

import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const projectId = useProjectId();
  const { data: statisticsData, isPending } = useGetStatistics({ projectId });

  if (isPending) {
    return <></>;
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
