import styled from 'styled-components';

const ProjectNum = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(76.11deg, #001945 0%, #000714 100.13%);
  padding: 32px 24px;
  gap: 16.8px;
  border-radius: 12.8px;
  width: 184px;
  height: 210px;
  align-items: flex-start;

  svg {
    width: 51.2px;
    height: 51.2px;
  }
  .ProjectNumber {
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    flex-direction: column;
  }
  span {
    margin-top: 8px;
    font-size: 14.4px;
  }
  @media (max-width: 750px) {
    width: 100%;
    align-items: center;
    flex-direction: row;
    height: auto;
    .ProjectNumber {
      flex-direction: column;
      display: flex;
    }
  }
`;

export { ProjectNum };
