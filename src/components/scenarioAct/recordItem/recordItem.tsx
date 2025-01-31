import { ACTION_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import * as S from '@/components/scenarioAct/recordItem/recordItem.style';

import Click from '@/assets/icons/click.svg?react';
import Del from '@/assets/icons/del.svg?react';
import Globe from '@/assets/icons/globe.svg?react';

interface IRecordItemProps {
  title?: string;
  type?: ACTION_TYPE;
}

// 액션 아이콘 매핑
const actionIconMap = {
  [ACTION_TYPE.NAVIGATE]: Globe,
  [ACTION_TYPE.CLICK]: Click,
  [ACTION_TYPE.HOVER]: null,
  [ACTION_TYPE.FILL_TEXT]: null,
  [ACTION_TYPE.WAITING]: null,
};

export default function RecordItem({ title, type }: IRecordItemProps) {
  const handleDel = () => {
    console.log('지우기');
  };
  return (
    <S.Container>
      <p>1.</p>
      <S.TextContainer>
        {type && <S.IconContainer>{getIcon(actionIconMap, type)}</S.IconContainer>}
        <p>{title}</p>
      </S.TextContainer>

      <S.DelContainer>
        <S.IconContainer>
          <Del onClick={handleDel} />
        </S.IconContainer>
      </S.DelContainer>
    </S.Container>
  );
}
