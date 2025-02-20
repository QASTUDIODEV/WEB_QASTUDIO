import styled from 'styled-components';

export const ModalBox = styled.div`
  max-width: 90%;
  margin-top: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const Content = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  letter-spacing: 0.4px;
  color: #999;
`;
export const BtnWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  justify-self: end;
  position: sticky;
  right: 0;
  gap: 20px;
  margin-top: 20px;
`;
