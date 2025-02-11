import styled from 'styled-components';

const TextBold = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 22.4px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.448px;
  margin-right: 4.5px;
`;

const TextLight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin: 16px 0 10px 0;
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.8px */
  letter-spacing: 0.224px;
`;

const Path = styled.p`
  color: rgba(217, 230, 255, 0.5);
  font-family: Pretendard;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 16.8px */
  letter-spacing: 0.224px;
`;

type TWrapperProps = {
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
};

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.352px;
  margin-bottom: 16px;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.align.row_space_between}
`;

const ButtonWrapper = styled.div`
  display: flex;
  max-width: 250px;
  margin-right: 24px;
  overflow-x: scroll;
  gap: 8px;
`;

const Wrapper = styled.div<TWrapperProps>`
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;

const LRBox = styled.div<{ width: string }>`
  box-sizing: border-box;
  background: rgba(217, 230, 255, 0.05);
  border-radius: 6.4px;
  padding: 8px;
  position: relative;
  margin-top: 16px;
  width: ${(props) => props.width};
  max-width: 100%;
  overflow: scroll;
`;

const InnerBox = styled.div`
  display: flex;
  padding-bottom: 16px;
  gap: 16px;
  height: 100%;
  height: inherit;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5px;
`;

const InnerBoxTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
`;
const AccessRights = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
const AccessBox = styled.div`
  display: flex;
  margin: 10px 20px;
  flex-direction: column;
`;
export const Scenario = styled.div`
  height: 100%;
  padding: 1rem;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6.4px;
`;
export const ScenarioText = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-family: Pretendard;
  font-size: 9.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 14.4px */
  letter-spacing: 0.192px;
`;
export const ButtonItem = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`;

export { AccessBox, AccessRights, ButtonWrapper, InnerBox, InnerBoxTitle, LRBox, Path, TextBold, TextLight, Title, TitleBox, Wrap, Wrapper };
