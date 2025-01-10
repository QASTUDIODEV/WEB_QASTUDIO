import styled from 'styled-components';

const ProjectList = styled.div`
  display: flex;
  background: #d9e6ff1a;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  border-radius: 12.8px;
  overflow-x: scroll;
  max-height: 280px;
`;

const Table = styled.table`
  width: 100%;
  height: auto;
  table-layout: auto;
  .right {
    padding-right: 2rem;
  }
`;

const TH = styled.th`
  ${({ theme }) => theme.text.medium_18}
  text-align: left;
  height: 26px;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  flex: none;
  svg {
    width: 19.2px;
    height: 19.2px;
  }
`;

const TBody = styled.tbody`
  height: auto;
  gap: 8px;
`;

export { Buttons, ProjectList, Table, TBody, TH };
