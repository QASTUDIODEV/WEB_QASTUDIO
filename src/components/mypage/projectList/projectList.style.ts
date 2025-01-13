import styled from 'styled-components';

const ProjectList = styled.div`
  display: flex;
  background: #d9e6ff1a;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  border-radius: 12.8px;
  gap: 10px;
  overflow-x: scroll;
  flex-direction: row;

  @media (max-width: 1030px) {
    flex-direction: column;
    height: auto;
    justify-content: center;
    overflow-y: hidden;
  }
  @media (min-width: 1122px) {
    height: 280px;
  }
  @media (max-width: 965px) {
    overflow-y: scroll;
  }
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
  /* white-space: nowrap; */
  color: ${({ theme }) => theme.colors.primary.pri_50};
  @media (max-width: 1030px) {
    text-align: center;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
  flex: none;
  margin-top: 5px;
  svg {
    width: 19.2px;
    height: 19.2px;
  }
  @media (max-width: 1030px) {
    align-self: center;
    gap: 30px;
  }
`;

const TBody = styled.tbody`
  height: auto;
  gap: 8px;
`;

export { Buttons, ProjectList, Table, TBody, TH };
