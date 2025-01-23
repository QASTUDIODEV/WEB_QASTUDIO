import styled from 'styled-components';

import { ACTION_STATE } from '@/enums/enums';

export const Container = styled.div`
  position: relative;
`;
export const Header = styled.div<{ state: ACTION_STATE; $isLastAction: boolean }>`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  justify-content: space-between;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 7.5px;
    right: 7.5px;
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
  left: 0;
`;

export const ActionType = styled.div`
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DescriptionItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 9px 64px;
`;
export const DescriptionRow = styled.div`
  display: flex;
  gap: 10px;
`;
export const Input = styled.input`
  padding: 4px 10px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  background-color: inherit;
  outline: none;
  width: 200px;
`;
