import styled from 'styled-components';

const ModalBox = styled.div`
  min-width: 760px;
  width: 760px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const BtnWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  justify-self: end;
  position: sticky;
  right: 0;
  gap: 20px;
`;
const Content = styled.div`
  display: flex;
  padding: 0 0 30px 0;
`;

export { BtnWrapper, Content, ModalBox };
