import styled from 'styled-components';

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  position: relative;
  width: 490px;
  max-height: 550px;
  padding: 30px 110px;
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
  padding-top: 60px;
  ${({ theme }) => theme.align.column_center};
  span {
    ${({ theme }) => theme.text.medium_14};
    width: 100%;
  }
`;

const BackButton = styled.button`
  height: 27px;
  ${({ theme }) => theme.text.medium_18}
  position: absolute;
  gap: 4px;
  top: 20px;
  left: 20px;
  z-index: 1;
  color: white;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  ${({ theme }) => theme.align.row_center};
  img {
    height: 24px;
    width: 24px;
  }
`;

const ProfileImg = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 100%;
  background-color: #505050;
  ${({ theme }) => theme.align.row_center};
  position: relative;
  &:hover {
    cursor: pointer;
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProfileEditBtn = styled.button`
  top: 115.2px;
  left: 115.2px;
  padding: 9.6px;
  border-radius: 79.2px;
  background-color: ${({ theme }) => theme.colors.point.point_2};
  ${({ theme }) => theme.align.row_center}
  position: absolute;
  border: none;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
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
  svg {
    width: 64px;
    height: 64px;
  }
`;

const Inputs = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export { BackButton, Backdrop, Container, Form, Inputs, ProfileEditBtn, ProfileImg, Wrapper };
