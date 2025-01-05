import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  padding: 50px 120px;
  gap: 20px;
  border-radius: 16px;
  z-index: 1;
  box-shadow: -1px 1px 4px 0px #1b3159;
  background: linear-gradient(76deg, #0e2245 0%, #000714 100.13%);
  background-color: #16181c;
`;
const Container2 = styled.div`
  ${({ theme }) => theme.align.column_center};
  gap: 30px;
  border-radius: 16px;
`;

const Texts = styled.div`
  ${({ theme }) => theme.align.column_center};
`;

const Title = styled.div`
  ${({ theme }) => theme.text.bold_24};
`;

const Description = styled.div`
  ${({ theme }) => theme.text.medium_18};
`;

const Form = styled.form`
  gap: 15px;
  ${({ theme }) => theme.align.column_center};
  position: relative;
  width: 100%;

  span {
    ${({ theme }) => theme.text.medium_14};
  }
`;

const Buttons = styled.div`
  ${({ theme }) => theme.align.row_center};
  width: 300px;
  padding: 10px;
  gap: 30px;
`;

const Button = styled.button`
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.background.black};
  border: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.41px;
  letter-spacing: -0.01em;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const MessageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 2px;
  right: 0;
`;
export { Button, Buttons, Container, Container2, Description, Form, MessageWrapper, Texts, Title, Wrapper };
