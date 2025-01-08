import * as S from '@/components/scenario/CharacterItem/CharacterItem.style';

import CharacterHeader from '../CharacterHeader/CharacterHeader';
import ScenarioItem from '../ScenarioItem/ScenarioItem';

export default function CharacterItem() {
  return (
    <S.CharacterItem>
      <CharacterHeader />
      <ScenarioItem />
      <ScenarioItem />
    </S.CharacterItem>
  );
}
