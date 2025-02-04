import { ACTION_TYPE } from '@/enums/enums';

import { getIcon } from '@/utils/getIcon';

import { useDispatch, useSelector } from '@/hooks/common/useCustomRedux';

import * as S from '@/components/scenarioAct/recordItem/recordItem.style';

import Click from '@/assets/icons/click.svg?react';
import Del from '@/assets/icons/del.svg?react';
import Globe from '@/assets/icons/globe.svg?react';
import { removeAction } from '@/slices/scenarioActSlice';

interface IRecordItemProps {
  type?: ACTION_TYPE;
  step: number;
}

// 액션 아이콘 매핑
const actionIconMap = {
  [ACTION_TYPE.NAVIGATE]: Globe,
  [ACTION_TYPE.CLICK]: Click,
  [ACTION_TYPE.HOVER]: null,
  [ACTION_TYPE.FILL_TEXT]: null,
  [ACTION_TYPE.WAITING]: null,
};

export default function RecordItem({ step }: IRecordItemProps) {
  const action = useSelector((state) => state.scenarioAct.recordActions.find((act) => act.step == step));
  const dispatch = useDispatch();
  const handleDel = () => {
    console.log('지우기');
    dispatch(removeAction(action?.step));
  };
  return (
    <S.Container>
      <p>{action?.step}.</p>
      <S.TextContainer>
        {action?.actionType && <S.IconContainer>{getIcon(actionIconMap, action?.actionType)}</S.IconContainer>}
        <p>{action?.actionDescription}</p>
      </S.TextContainer>

      <S.DelContainer>
        <S.IconContainer>
          <Del onClick={handleDel} />
        </S.IconContainer>
      </S.DelContainer>
    </S.Container>
  );
}
