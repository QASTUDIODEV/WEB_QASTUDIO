import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: 100%;

  padding: 50px 50px;
`;

const ProjectTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    ${({ theme }) => theme.text.medium_18};
  }
`;

const ProfileBox = styled.div`
  width: 30px;
  height: 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  span {
    width: 100%;
    height: 400px;
    background-color: antiquewhite;
  }

  img {
    width: 100%;
  }
`;

const SearchBox = styled.div`
  width: 180px;
`;

export { Container, InfoWrapper, ProfileBox, ProjectTitleBox, SearchBox, TableWrapper };
