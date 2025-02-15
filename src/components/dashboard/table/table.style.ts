import styled, { keyframes } from 'styled-components';

const TableContainer = styled.div`
  ${({ theme }) => theme.align.column_center};
  gap: 15px;
  width: 100%;

  ${({ theme }) => theme.text.medium_14};
`;

const TableWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: max(100%, 1100px);
  margin: 0 auto;

  border-collapse: separate;
  border-spacing: 0 1px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const TableHeader = styled.thead`
  tr {
    background: linear-gradient(76deg, #001945 0%, #000714 100.13%);

    th:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border-left: 1px solid rgba(32, 75, 153, 0.2);
    }

    th:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-right: 1px solid rgba(32, 75, 153, 0.2);
    }
  }
`;

const Th = styled.th`
  padding: 15px 20px;
  text-align: left;

  border-top: 1px solid rgba(32, 75, 153, 0.2);
  border-bottom: 1px solid rgba(32, 75, 153, 0.2);
`;

const Tr = styled.tr`
  ${({ theme }) => theme.text.medium_14};
  background: linear-gradient(76deg, #001945 0%, #000714 100.13%);
  border-radius: 6px;
  overflow: hidden;

  &:nth-child(odd) {
    background: none;
  }

  &:nth-child(even) {
    background: linear-gradient(76deg, #001945 0%, #000714 100.13%);
  }

  &:first-child td:first-child {
    border-top-left-radius: 6px;
  }
  &:first-child td:last-child {
    border-top-right-radius: 6px;
  }
  &:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }
  &:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;

const Td = styled.td`
  ${({ theme }) => theme.text.medium_14};
  padding: 15px 20px;

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const State = styled.span<{ $isSuccess: boolean }>`
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success.success_500 : theme.colors.error.error_500)};
`;

const Action = styled.button<{ $isSuccess: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success.success_700 : theme.colors.error.error_400)};
  border: none;
  background: none;
  cursor: pointer;
`;

const PageNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 25px;
`;

const PageBtnBox = styled.button<{ $cur: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 100%;
  padding: 2px 9px;
  border-radius: 3px;

  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  background-color: ${({ $cur }) => ($cur ? 'rgba(217, 230, 255, 0.2)' : 'transparent')};

  &:hover {
    background: rgba(217, 230, 255, 0.2);
  }
`;

const ArrowBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 100%;

  padding: 0;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  background-color: transparent;

  &:hover {
    background: rgba(217, 230, 255, 0.2);
    border-radius: 3px;
  }

  &:disabled {
    background-color: transparent;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ButtonHeader = styled.button`
  width: 100%;

  display: flex;
  gap: 5px;
  align-items: center;
  background: transparent;
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const SearchBox = styled.div`
  width: 190px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Skeleton = styled.div`
  width: 100%;
  height: 440px;
  background-color: #141b2e;
  border-radius: 8px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const TestName = styled.span`
  word-break: keep-all;
  max-width: 277px;
`;

export {
  Action,
  ArrowBox,
  ButtonHeader,
  HeaderWrapper,
  PageBtnBox,
  PageNumberWrapper,
  SearchBox,
  Skeleton,
  State,
  Table,
  TableContainer,
  TableHeader,
  TableWrapper,
  Td,
  TestName,
  Th,
  Tr,
  Wrapper,
};
