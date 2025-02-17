import styled from 'styled-components';

import { media } from '@/styles/media';

export const ModalBox = styled.div`
  height: 100%;
  max-width: 860px;
  min-width: 700px;
  gap: 16px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  ${media.desktop`
    width: 100%;
    min-width: 350px;
  `}
`;
export const PostBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
export const ModalText = styled.p`
  font-family: Pretendard;
  font-size: 17.6px;
  font-weight: 500;
  line-height: 26.4px;
  letter-spacing: 0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  color: ${({ theme }) => theme.colors.primary.pri_50};
`;
export const tagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  overflow: auto;
  flex-wrap: wrap;
`;
export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const ProjectText = styled.p`
  font-family: Pretendard;
  font-size: 19.2px;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  color: #d6deec;
`;
export const Position = styled.div`
  padding-top: 25px;
  display: flex;
  justify-content: flex-end;
`;
export const ProfileWrapper = styled.div`
  width: 55px;
  height: 55px;
`;
export const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 60px;
  height: 60px;
  justify-content: center;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
  }
`;
