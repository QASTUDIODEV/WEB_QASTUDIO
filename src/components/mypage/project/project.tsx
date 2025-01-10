import Profile from '@/components/common/profile/profile';
import * as S from '@/components/mypage/project/project.style';

type TProject = {
  id: number;
  name: string;
  participants: number;
  date: string;
};

export default function Project({ id, name, participants, date }: TProject) {
  return (
    <S.TR key={id}>
      <S.TD>
        <S.ProjectNameTD>
          <div className="ProfileWrapper">
            <Profile />
          </div>
          {name}
        </S.ProjectNameTD>
      </S.TD>
      <S.TD>{participants}</S.TD>
      <S.TD>{date}</S.TD>
    </S.TR>
  );
}
