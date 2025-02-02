import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  position: relative;
  width: 490px;
  max-height: 550px;
  gap: 20px;
  border-radius: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.black};
  .logo {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 30px;
  }
`;

const Form = styled.form`
  width: 100%;
  gap: 20px;
  ${({ theme }) => theme.align.column_center};
  span {
    ${({ theme }) => theme.text.medium_14};
    width: 100%;
  }
`;
const Container2 = styled.div`
  ${({ theme }) => theme.align.column_center};
  gap: 15px;
  border-radius: 16px;
  padding-top: 90px;
  padding-bottom: 20px;
  height: 100%;
`;

const Texts = styled.div`
  ${({ theme }) => theme.text.medium_14};
  ${({ theme }) => theme.align.column_center};
  color: ${({ theme }) => theme.colors.gray.gray_200};
  font-weight: 500;
`;

const Title = styled.div`
  ${({ theme }) => theme.text.bold_24};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const Description = styled.div`
  ${({ theme }) => theme.text.medium_18};
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
  position: relative;
`;

const Wrapper2 = styled.div`
  display: flex;
  position: relative;
`;

const MessageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 2px;
  right: 0;
`;

export { Button, Buttons, Container, Container2, Description, Form, MessageWrapper, Texts, Title, Wrapper, Wrapper2 };
