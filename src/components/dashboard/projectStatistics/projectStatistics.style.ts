import styled from 'styled-components';

import { media } from '@/styles/media';

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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1260px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.phone`
      grid-template-columns: repeat(1, 1fr);
   `}
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
