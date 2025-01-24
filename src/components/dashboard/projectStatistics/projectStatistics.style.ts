import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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

const ProjectTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    ${({ theme }) => theme.text.medium_18};
  }
`;

export { Container, InfoWrapper, ProfileBox, ProjectTitleBox };
