import Profile from '@/components/common/profile/profile';
import SearchBar from '@/components/common/searchBar/searchBar';
import PercentLabel from '@/components/dashboard/percentLabel/percentLabel';
import ProjectInfoBox from '@/components/dashboard/projectInfoBox/projectInfoBox';

import FailIcon from '@/assets/icons/fail.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import SuccessIcon from '@/assets/icons/success.svg?react';
import UserIcon from '@/assets/icons/user_profile.svg?react';
import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const title = 'UMC_PM_DAY';

  return (
    <S.Container>
      <S.ProjectTitleBox>
        <S.ProfileBox>
          <Profile />
        </S.ProfileBox>
        <p>{title}</p>
      </S.ProjectTitleBox>
      <S.InfoWrapper>
        <ProjectInfoBox
          label={'Successes'}
          content={'500'}
          icon={<SuccessIcon width={'14px'} height={'14px'} />}
          percentLabel={<PercentLabel percent={24.8} increase={true} />}
        />
        <ProjectInfoBox
          label={'Failures'}
          content={'23'}
          icon={<FailIcon width={'14px'} height={'14px'} />}
          percentLabel={<PercentLabel percent={17.8} increase={false} />}
        />
        <ProjectInfoBox label={'Participants'} content={'5'} icon={<UserIcon width={'15px'} height={'15px'} />} />
        <ProjectInfoBox label={'Total Test'} content={'15'} icon={<StarIcon />} />
      </S.InfoWrapper>
      <S.TableWrapper>
        <S.SearchBox>
          <SearchBar placeholder={'Search by name'} />
        </S.SearchBox>
        {/*<span>표자리</span>*/}
      </S.TableWrapper>
    </S.Container>
  );
}
