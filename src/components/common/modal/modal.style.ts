import { motion } from 'framer-motion';
import styled from 'styled-components';

import { media } from '@/styles/media.ts';

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.align.row_center}
  background-color: rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled(motion.div)`
  margin: 1.5rem auto;
  max-width: 80%;
  min-width: 500px;
  max-height: 90%;
  padding: 40px 50px;
  box-shadow: 10px 20px 100px 0 rgba(35, 104, 232, 0.2);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_700};
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  overflow-y: auto;

  ${media.phone`
    padding: 30px;
    min-width: 95%;
  `}
`;

const TitleWrapper = styled.div`
  gap: 10px;
  ${({ theme }) => theme.align.row_space_between};
`;

const Title = styled.h1`
  margin: 0;
  ${({ theme }) => theme.text.bold_28};
  color: ${({ theme }) => theme.colors.primary.pri_50};

  ${media.phone`
   ${({ theme }) => theme.text.medium_18};
  `}
`;

const Button = styled.button`
  border: none;
  background-color: transparent;

  ${media.phone`
      svg {
        width: 15px;
        height: 15px;
  `}
`;

export { Button, Container, Title, TitleWrapper, Wrapper };
