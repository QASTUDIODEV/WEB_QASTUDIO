import styled from 'styled-components';

import { media } from '@/styles/media';

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.primary.pri_50};
  font-size: 17.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  min-height: 20px;
  letter-spacing: 0.352px;
  margin-bottom: 12px;
  @media (max-width: 530px) {
    width: 50%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  ${media.desktop`
    ${({ theme }) => theme.text.medium_14};
    margin-bottom: 10px;
  `}
`;
export const MemberContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  max-height: 78%;
  ${media.desktop`
    max-height: 80%;
  `}
  z-index: 200;
`;
export const Member = styled.div`
  ${({ theme }) => theme.align.row_space_between};
  width: 100%;
  gap: 2.5%;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  isolation: isolate;
  z-index: 210;
`;
export const MemberBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  gap: 4.05%;
  max-width: 100%;
`;
export const ProfileWrapper = styled.div`
  min-width: 25.6px;
  min-height: 25.6px;
  width: 25.6px;
  height: 25.6px;
`;
export const UnacceptedWrapper = styled(ProfileWrapper)`
  background-color: #677082;
  opacity: 0.5;
  border-radius: 100%;
`;
export const MemberName = styled.p`
  margin: 0;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.288px;
  ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  @media (max-width: 1200px) {
    max-width: 70%;
  }
`;
export const UnacceptedName = styled(MemberName)`
  max-width: 100%;
  color: #677082;
`;
export const Wrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 16px;
`;
