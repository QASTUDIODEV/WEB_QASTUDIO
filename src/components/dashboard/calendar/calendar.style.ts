import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  padding: 12px;
  border-radius: 6.4px;
  border: 0.8px solid #082659;
  background-color: #16181c;
`;

const CalenderHeaderWrapper = styled.div`
  ${({ theme }) => theme.align.row_space_between};
  background-color: ${({ theme }) => theme.colors.point.point_2};
  border-radius: 79.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
  font-size: 11px;
  padding: 0px 6.4px;

  button {
    background-color: transparent;
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
`;
const DayofWeekWrapper = styled.div`
  ${({ theme }) => theme.align.row_space_between};
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray.gray_500};
  padding: 8px 0;

  div {
    width: 24px;
    height: 24px;
    ${({ theme }) => theme.align.row_center};
  }
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;

  gap: 4px 5.6px;
`;

const Day = styled.div<{ $isSelected: boolean; $isCurrentMonth: boolean }>`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.224px;
  font-size: 11px;
  border-radius: 79.2px;

  color: ${({ theme, $isCurrentMonth }) => ($isCurrentMonth ? theme.colors.primary.pri_50 : theme.colors.gray.gray_300)};
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.point.point_2 : 'transparent')};

  &:hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export { CalendarContainer, CalenderHeaderWrapper, Container, Day, DayofWeekWrapper, DayWrapper };
