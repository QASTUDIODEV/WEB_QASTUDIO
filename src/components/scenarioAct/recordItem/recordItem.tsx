import { ACTION_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import * as S from '@/components/scenarioAct/recordItem/recordItem.style';

import Click from '@/assets/icons/click.svg?react';
import Del from '@/assets/icons/del.svg?react';
import Globe from '@/assets/icons/globe.svg?react';
import Input from '@/assets/icons/input.svg?react';

interface IRecordItemProps {
  step: number;
  actionType: string;
  actionDescription: string;
  handleDel: () => void;
}

// 액션 아이콘 매핑
const actionIconMap = {
  [ACTION_TYPE.CLICK]: Click,
  [ACTION_TYPE.NAVIGATE]: Globe,
  [ACTION_TYPE.Fill_Text]: Input,
};

export default function RecordItem({ step, actionType, actionDescription, handleDel }: IRecordItemProps) {
  return (
    <S.Container>
      <p>{step}.</p>
      <S.TextContainer>
        <S.IconContainer>{getIcon(actionIconMap, actionType)}</S.IconContainer>
        <p>{actionDescription}</p>
      </S.TextContainer>

      <S.DelContainer>
        <S.IconContainer>
          <Del onClick={handleDel} />
        </S.IconContainer>
      </S.DelContainer>
    </S.Container>
  );
}
