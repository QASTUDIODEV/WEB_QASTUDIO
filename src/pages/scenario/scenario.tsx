import { DEVICE, STACK } from '@/enums/enums';

import { useSelector } from '@/hooks/common/useCustomRedux.ts';

import ProjectTitle from '@/components/common/projectTitle/projectTitle';
import ButtonGroup from '@/components/scenario/buttonGroup/buttonGroup';
import CharacterList from '@/components/scenario/characterList/characterList';
import ScenarioModal from '@/components/scenario/scenarioModal/scenarioModal';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import * as S from '@/pages/scenario/scenario.style';

export default function ScenarioPage() {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <S.Background>
      {isOpen && <ScenarioModal />}
      <S.Container>
        <S.Header>
          <ProjectTitle title="UMC_PM_DAY" device={DEVICE.MOBILE} stack={STACK.JS} />
        </S.Header>

        <ButtonGroup />

        <S.CharactersContainer>
          <CharacterList />
        </S.CharactersContainer>
      </S.Container>

      <S.Pagination>
        <ArrowLeft />
        <S.PageNumber>1</S.PageNumber>
        <ArrowRight />
      </S.Pagination>
    </S.Background>
  );
}
