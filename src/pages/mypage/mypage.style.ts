import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-self: center;
  height: 100vh;
  flex-direction: column;
  padding: 30px;
  max-width: 1200px;
  gap: 20px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  position: relative;
  height: 320px;
  padding: 10px 20px;
  border-radius: 12.8px;
  align-items: end;
  justify-content: space-between;
  background: linear-gradient(0deg, rgba(0, 7, 20, 0.8) 0%, rgba(0, 7, 20, 0) 100%),
    url('https://img.freepik.com/free-photo/cartoon-style-summer-scene-with-cute-animals_23-2151068415.jpg');
  background-size: cover;
  background-position: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    color: ${({ theme }) => theme.colors.primary.pri_50};
    font-size: 38.4px;
    font-weight: 700;
  }
`;

const Account = styled.div`
  display: flex;
  font-size: 19.2px;
  font-weight: 500;
`;

const ProjectNum = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(76.11deg, #001945 0%, #000714 100.13%);
  padding: 32px 24px;
  gap: 16.8px;
  border-radius: 12.8px;
  max-width: 184px;
  height: 210px;
  svg {
    width: 51.2px;
    height: 51.2px;
  }
  .ProjectNumber {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
  }
  span {
    font-size: 14.4px;
  }
`;

const Projects = styled.div`
  display: flex;
  gap: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  background: #d9e6ff1a;
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  height: auto; /* 자동으로 크기 조정 */
  border-radius: 12.8px;
  overflow-x: scroll;
`;

const Table = styled.table`
  width: 100%;
  height: auto;
  table-layout: auto;
`;

const TH = styled.th`
  ${({ theme }) => theme.text.medium_18}
  text-align: left;
  height: 26px;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const TD = styled.td`
  ${({ theme }) => theme.text.medium_14}
  height: 26px;
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

const ProjectNameTD = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  ${({ theme }) => theme.text.medium_14}
  .ProfileWrapper {
    width: 19.2px;
    height: 19.2px;
  }
`;

const TR = styled.tr`
  height: 26px;
`;

const TBody = styled.tbody`
  height: auto;
  gap: 8px;
`;
export { Account, Buttons, Container, ProfileWrapper, ProjectList, ProjectNameTD, ProjectNum, Projects, Table, TBody, TD, TH, TR, UserInfo };
