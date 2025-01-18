import styled from 'styled-components';

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

const Form = styled.form`
  width: 300px;
  display: flex;
  ${({ theme }) => theme.align.column_center}
  gap:20px;
  gap: 20px;
  padding-top: 60px;
  ${({ theme }) => theme.align.column_center};
`;

const Container = styled.div`
  ${({ theme }) => theme.align.column_center};
  position: relative;
  max-height: 550px;
  height: 500px;
  padding: 30px 80px;
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
export { Backdrop, Container, Form, ProfileEditBtn, ProfileImg };
