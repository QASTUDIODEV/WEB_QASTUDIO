import styled from 'styled-components';

const ProjectList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background: #d9e6ff1a;
  margin-left: 20px;
  padding: 20px;
  border-radius: 12.8px;
  gap: 10px;
  height: 283px;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  @media (max-width: 1138px) {
    min-height: 310px;
  }
  @media (max-width: 1105px) {
    min-height: 340px;
  }
  @media (max-width: 1088px) {
    flex-direction: column;
    min-height: 360px;
    overflow-x: hidden;
  }
  @media (max-width: 1049px) {
    min-height: 380px;
  }
  @media (max-width: 1024px) {
    min-height: 320px;
  }
  @media (max-width: 914px) {
    min-height: 380px;
  }
  @media (max-width: 847px) {
    width: 100%;
    min-height: 360px;
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  overflow-y: hidden;
  .blank {
    min-width: 2rem;
  }

  @media (max-width: 1050px) {
    max-height: 80%;
    overflow-x: scroll;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  flex: 1;
  overflow-y: hidden;
`;

const TH = styled.th`
  ${({ theme }) => theme.text.medium_18};
  text-align: left;
  height: 26px;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};

  @media (max-width: 1138px), (max-width: 1050px) {
    text-align: center;
    padding: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 5px;

  @media (max-width: 1088px) {
    justify-content: center;
    gap: 30px;
    width: 100%;
  }
`;

const Button = styled.div<{ $disable: boolean }>`
  &:hover {
    cursor: ${(props) => (props.$disable ? 'default' : 'pointer')};
  }
  svg {
    width: 19.2px;
    height: 19.2px;
  }
`;

export { Button, Buttons, ProjectList, Table, TableWrapper, TH };
