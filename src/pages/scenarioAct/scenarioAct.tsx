import ActSection from '@/components/scenarioAct/actSection/actSection';
import Controller from '@/components/scenarioAct/controller/controller';
import Header from '@/components/scenarioAct/header/header';

import * as S from '@/pages/scenarioAct/scenarioAct.style';

export default function ScenarioActPage() {
  return (
    <S.Container>
      <S.Header>
        <Header textURL="URL경로" />
      </S.Header>

      <S.Controller>
        <Controller />
      </S.Controller>

      <S.ActSection>
        <ActSection />
      </S.ActSection>
    </S.Container>
  );
}
