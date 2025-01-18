import styled from 'styled-components';

import { media } from '@/styles/media';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 15px;

  p {
    ${({ theme }) => theme.text.medium_18};
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ScreenShotWrapper = styled.div`
  width: 768px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.tablet`
      width: 100%;
  `}
`;
const ScreenShotBox = styled.div`
  background-color: #353535;
  border-radius: 13px;
  width: 100%;
  height: 450px;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  flex: 1;
  min-width: 256px;

  ${media.tablet`
      min-width: unset;
  `}
`;

const ResultBox = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  background: rgba(223, 232, 249, 0.05);
`;

const MessageBox = styled(ResultBox)`
  height: 256px;
`;
const ErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;

  button {
    width: fit-content;
  }
`;

export { ButtonBox, Container, ErrorWrapper, MessageBox, ResultBox, ResultContainer, ResultWrapper, ScreenShotBox, ScreenShotWrapper };
