import styled from 'styled-components';

import { ACTION_STATE } from '@/enums/enums';

export const Container = styled.div<{ state: ACTION_STATE; isLastAction: boolean }>`
  display: flex;
  padding: 10px 30px;
  align-items: center;
  position: relative;
  justify-content: space-between;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 7.5px;
    right: 7.5px;
    height: 2px;
    background-color: ${({ theme, state, isLastAction }) =>
      isLastAction
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
  bottom: -20px;
  left: 0;
`;

export const ActionType = styled.div`
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
`;
