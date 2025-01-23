import styled from 'styled-components';

import { ACTION_STATE } from '@/enums/enums';

export const Container = styled.div<{ $isError: boolean }>`
  position: relative;
  ${({ $isError }) => $isError && 'margin-bottom: 30px;'};
`;
export const Header = styled.div<{ state: ACTION_STATE; $isLastAction: boolean; $isOpen: boolean }>`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  ${({ $isOpen }) => $isOpen && 'background-color: rgba(217, 230, 255, 0.05);'};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 9px;
    right: 9px;
    height: 2px;
    background-color: ${({ theme, state, $isLastAction }) =>
      $isLastAction
        ? state === ACTION_STATE.SUCCESS
          ? theme.colors.point.point_1
          : state === ACTION_STATE.ERROR
            ? theme.colors.error.error_500
            : 'transparent'
        : 'transparent'};
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionName = styled.div`
  ${({ theme }) => theme.text.medium_20};
  height: 100%;
  margin-right: 10px;
`;

export const UnderIcon = styled.div`
  position: absolute;
  bottom: -19px;
  left: 5.5px;
`;

export const ActionType = styled.div`
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
`;

//상세
export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DescriptionItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9px 50px;
`;
export const DescriptionRow = styled.div`
  display: flex;
  gap: 10px;
  ${({ theme }) => theme.text.medium_18};
`;
export const Input = styled.input`
  padding: 4px 10px;
  ${({ theme }) => theme.text.medium_18};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  background-color: inherit;
  outline: none;
  width: 200px;
  margin-bottom: 5px;
`;

export const CheckError = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.text.medium_18};
  color: ${({ theme }) => theme.colors.error.error_500};
  cursor: pointer;
  right: 30px;
`;
