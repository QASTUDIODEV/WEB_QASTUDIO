import { useState } from 'react';

import useDebounce from '@/hooks/common/useDebounce';

import Profile from '@/components/common/profile/profile';
import SearchBar from '@/components/common/searchBar/searchBar';
import PercentLabel from '@/components/dashboard/percentLabel/percentLabel';
import ProjectInfoBox from '@/components/dashboard/projectInfoBox/projectInfoBox';
import Table from '@/components/dashboard/table/table';

import FailIcon from '@/assets/icons/fail.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import SuccessIcon from '@/assets/icons/success.svg?react';
import UserIcon from '@/assets/icons/user_profile.svg?react';
import * as S from '@/pages/dashboard/dashboard.style';

export default function DashboardPage() {
  const title = 'UMC_PM_DAY';
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);

  console.log(debouncedSearch);

  return (
    <S.Container>
      {/*TODO: 프로필 box 공용컴포넌트로 수정 예정*/}
      <S.ProjectTitleBox>
        <S.ProfileBox>
          <Profile />
        </S.ProfileBox>
        <p>{title}</p>
      </S.ProjectTitleBox>
      <S.ContentWrapper>
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
            <SearchBar placeholder={'Search by name'} value={search} onChange={(e) => setSearch(e.target.value)} />
          </S.SearchBox>
          <Table />
        </S.TableWrapper>
      </S.ContentWrapper>
    </S.Container>
  );
}
