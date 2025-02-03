import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  position: relative;
  padding: 50px 120px;
  gap: 30px;
  border-radius: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.black};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;
const Wrapper2 = styled.div`
  display: flex;
  position: relative;
`;

const MessageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -24px;
  right: 0;
`;

const MessageWrapper3 = styled.div`
  display: flex;
`;

const MessageWrapper2 = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: -90px;
  top: 0;
`;

const AuthButtonWrapper = styled.div`
  position: absolute;
  right: -90px;
`;

export { AuthButtonWrapper, ButtonWrapper, Container, MessageWrapper, MessageWrapper2, MessageWrapper3, Wrapper, Wrapper2 };
