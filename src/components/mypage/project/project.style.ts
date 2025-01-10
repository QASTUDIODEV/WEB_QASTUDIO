import styled from 'styled-components';

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

const ProfileImg = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 100%;
  background-color: #505050;
  ${({ theme }) => theme.align.row_center};
  position: relative;
  z-index: 1;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProfileEditBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.point.point_2};
  border-radius: 100%;
  ${({ theme }) => theme.align.row_center};
  position: absolute;
  width: 44.8px;
  height: 44.8px;
  top: 67.2px;
  left: 67.2px;
  padding: 9.6px 8.8px 9.6px 10.4px;
  gap: 0px;
  border-radius: 79.2px;
  opacity: 0px;

  border: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  height: 152px;
`;

const ProfileUserInfo = styled.div`
  display: flex;
  gap: 15px;
`;
export { Buttons, Container2, ProfileEditBtn, ProfileImg, ProfileUserInfo, ProjectList, ProjectNameTD, Table, TBody, TD, TH, TR };
