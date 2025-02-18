import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Option = styled.li`
  font-weight: 500;
  font-size: 12px;
  line-height: 38px;
  letter-spacing: 2%;
  list-style: none;
  color: #d9e6ff;
  text-align: center;
  height: 38px;
  border-bottom: 1px solid #082659;
`;
export const Last = styled(Option)`
  border-bottom: none;
`;
export const Menu = styled.div`
  width: 86px;
  min-height: 38px;
  background: #16181c;
  border-radius: 8px;
  border: 1px solid #082659;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 500;
  cursor: pointer;
`;
