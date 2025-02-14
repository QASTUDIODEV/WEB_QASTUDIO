import { memo } from 'react';

import type { TGetStatisticsResponse } from '@/types/test/test.ts';

import Profile from '@/components/common/profile/profile';
import PercentLabel from '@/components/dashboard/percentLabel/percentLabel';
import ProjectInfoBox from '@/components/dashboard/projectInfoBox/projectInfoBox';

import * as S from './projectStatistics.style';

import FailIcon from '@/assets/icons/fail.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import SuccessIcon from '@/assets/icons/success.svg?react';
import UserIcon from '@/assets/icons/user_profile.svg?react';

interface IProps {
  data: TGetStatisticsResponse;
}

function ProjectStatistics({ data }: IProps) {
  const { projectName, projectImage, failRate, successRate, totalFailCnt, totalTestCnt, totalSuccessCnt, participant } = data?.result ?? {};

  return (
    <S.Container>
      <S.ProjectTitleBox>
        <S.ProfileBox>
          <Profile profileImg={projectImage as string} />
        </S.ProfileBox>
        <p>{projectName}</p>
      </S.ProjectTitleBox>
      <S.InfoWrapper>
        <ProjectInfoBox
          label={'Successes'}
          content={totalSuccessCnt as number}
          icon={<SuccessIcon width={'14px'} height={'14px'} />}
          percentLabel={<PercentLabel percent={successRate as number} increase={true} />}
        />
        <ProjectInfoBox
          label={'Failures'}
          content={totalFailCnt as number}
          icon={<FailIcon width={'14px'} height={'14px'} />}
          percentLabel={<PercentLabel percent={failRate as number} increase={false} />}
        />
        <ProjectInfoBox label={'Participants'} content={participant as number} icon={<UserIcon width={'15px'} height={'15px'} />} />
        <ProjectInfoBox label={'Total Test'} content={totalTestCnt as number} icon={<StarIcon />} />
      </S.InfoWrapper>
    </S.Container>
  );
}
export default memo(ProjectStatistics);
