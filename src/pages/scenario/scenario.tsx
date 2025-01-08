import Button from '@/components/common/button/button';
import CharacterItem from '@/components/scenario/CharacterItem/CharacterItem';

import Add from '@/assets/icons/add.svg?react';
import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Play from '@/assets/icons/play.svg?react';
import * as S from '@/pages/scenario/scenario.style';

export default function ScenarioPage() {
  return (
    <S.Background>
      <S.Container>
        <S.Header>
          <h1>UMC_PM_DAY</h1>
        </S.Header>

        <S.ButtonGroup>
          <Button type="normal" color="default" disabled={false} icon={<Play />} iconPosition="right">
            Play
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Edit />} iconPosition="left">
            Edit
          </Button>
          <Button type="normal" color="default" disabled={false} icon={<Add />} iconPosition="left">
            Scenario
          </Button>
        </S.ButtonGroup>

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
