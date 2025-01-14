import Input from '@/components/common/input/input.tsx';
import ProjectTitle from '@/components/common/projectTitle/projectTitle';

import * as S from '@/pages/scenario/scenario.style';

export default function ScenarioPage() {
  return (
    <S.Container>
      <Input />
      <ProjectTitle title="My Mobile App" profileImg="/icons/logo.svg" device="pc" stack="js" />
    </S.Container>
  );
}
