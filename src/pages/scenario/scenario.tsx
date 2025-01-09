import ButtonGroup from '@/components/scenario/ButtonGroup/ButtonGroup';
import CharacterItem from '@/components/scenario/CharacterItem/CharacterItem';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import * as S from '@/pages/scenario/scenario.style';

export default function ScenarioPage() {
  return (
    <S.Background>
      <S.Container>
        <S.Header>
          <h1>UMC_PM_DAY</h1>
        </S.Header>

        <ButtonGroup />

        <S.CharactersContainer>
          <CharacterItem />
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
