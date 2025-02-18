import { memo } from 'react';
import Frame from 'react-frame-component';

import { useSelector } from '@/hooks/common/useCustomRedux';

import * as S from '@/components/scenarioAct/actSection/actSection.style';

import InnerComponent from './InnerComponent';

export default memo(function ActSection() {
  const currentHtml = useSelector((state) => state.scenarioAct.currentHtml);
  const currentCss = useSelector((state) => state.scenarioAct.currentCss);

  const style = {
    width: '100%',
    height: '100%',
    border: 'none',
    margin: '0px',
    padding: '0px',
  };

  return (
    <S.Container>
      <Frame
        style={style}
        initialContent="<html><head><style></style></head><body><div id='mountHere'></div></body></html>"
        mountTarget="#mountHere"
        sandbox="allow-scripts allow-same-origin"
      >
        <InnerComponent htmlContent={currentHtml} cssContent={currentCss} />
      </Frame>
    </S.Container>
  );
});
