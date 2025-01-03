import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  position: relative;
  /* width: 500px;
  height: 514px; */
  padding: 50px 120px;
  gap: 20px;
  border-radius: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.background.black};
`;

const Form = styled.form`
  width: 301px;
  gap: 10px;
  position: relative;
  ${({ theme }) => theme.align.column_center};
  span {
    ${({ theme }) => theme.text.medium_14};
    width: 100%;
  }
  button {
    height: 40px;
  }
`;

const BackButton = styled.div`
  height: 27px;
  ${({ theme }) => theme.text.medium_18}
  position: absolute;
  gap: 4px;
  top: 20px;
  left: 20px;
  ${({ theme }) => theme.align.row_center};
  img {
    height: 24px;
    width: 24px;
  }
`;

const ProfileImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: #505050;
  ${({ theme }) => theme.align.row_center};
  position: relative;
`;

const ProfileEditBtn = styled.button`
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary.pri_300};
  border-radius: 100%;
  ${({ theme }) => theme.align.row_center};
  position: absolute;
  top: 144px;
  left: 144px;
  border: none;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;

const Backdrop = styled.div`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 100%;
  z-index: 1;
  &:hover {
    opacity: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
  }
  img {
    width: 64px;
    height: 64px;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const MessageWrapper2 = styled.div`
  display: flex;
  position: absolute;
  top: 2px;
  right: 0;
`;
export { BackButton, Backdrop, Container, Form, MessageWrapper, MessageWrapper2, ProfileEditBtn, ProfileImg, Wrapper };
