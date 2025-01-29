import styled from 'styled-components';

const Container = styled.div`
  border-radius: 12.8px;
  border: 0.8px solid rgba(32, 75, 153, 0.2);
  background: linear-gradient(76deg, #001945 0%, #000714 100.13%);
  padding: 10px 14px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const LabelWrapper = styled.div`
  ${({ theme }) => theme.text.medium_14};

  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentBox = styled.p`
  ${({ theme }) => theme.text.bold_28};
`;

export { Container, ContentBox, ContentWrapper, LabelWrapper };
