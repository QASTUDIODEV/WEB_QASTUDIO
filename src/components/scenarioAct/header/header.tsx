import { useSelector } from '@/hooks/common/useCustomRedux';

import * as S from '@/components/scenarioAct/header/header.style';

export default function Header() {
  const projectUrl = useSelector((state) => state.scenarioAct.projectUrl);
  return (
    <S.Container>
      <p>{projectUrl}</p>
    </S.Container>
  );
}
