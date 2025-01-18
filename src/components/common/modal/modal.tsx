import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePortal } from '@/hooks/common/usePortal';

import * as S from '@/components/common/modal/modal.style';

import Delete from '@/assets/icons/delete.svg?react';
import { setClose } from '@/slices/modalSlice';
import type { TRootState } from '@/store/store.ts';

type TModalProps = {
  title?: string;
  children: ReactNode;
  isExitButtonVisible?: boolean;
};

export default function Modal({ children, title, isExitButtonVisible = true }: TModalProps) {
  const { isOpen } = useSelector((state: TRootState) => state.modal);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const portal = usePortal('modal');

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return portal(
    isVisible && (
      <S.Container onClick={() => dispatch(setClose())}>
        <S.Wrapper
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{
            y: 30,
            opacity: 0,
          }}
          transition={{
            ease: 'easeOut',
            duration: 0.5,
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <S.TitleWrapper>
            <S.Title>{title}</S.Title>
            {isExitButtonVisible && (
              <S.Button onClick={() => dispatch(setClose())}>
                <Delete width={20} height={20} />
              </S.Button>
            )}
          </S.TitleWrapper>
          {children}
        </S.Wrapper>
      </S.Container>
    ),
  );
}
