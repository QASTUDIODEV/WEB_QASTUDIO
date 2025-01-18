import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 100%;
  padding: 65px 60px;
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
  gap: 20px;
  flex-wrap: wrap;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SearchBox = styled.div`
  width: 190px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export { Container, ContentWrapper, InfoWrapper, ProfileBox, ProjectTitleBox, SearchBox, TableWrapper };
