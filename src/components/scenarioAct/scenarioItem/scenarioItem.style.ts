import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ScenarioHeader = styled.div<{ $isOpen: boolean | undefined }>`
  height: 45px;
  width: 100%;
  padding: 8px 24px;

  gap: 6.4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ $isOpen }) =>
    $isOpen &&
    `
      background: linear-gradient(76deg, #001945 0%, #000714 100.13%);
    `}
`;

export const Title = styled.div`
  flex: 1;
  ${({ theme }) => theme.text.medium_24};
  font-size: 19.2px;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ActionList = styled.div`
  border-radius: 0 0 8px 8px;
`;

export const ActionDescription = styled.div`
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme }) => theme.colors.point.point_1};
  padding: 6.4px 24px;
  background-color: rgba(217, 230, 255, 0.05);
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 19.2px;
  height: 19.2px;
  cursor: pointer;
  pointer-events: all;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HeadDivider = styled.div`
  display: flex;
  gap: 6.4px;
`;
