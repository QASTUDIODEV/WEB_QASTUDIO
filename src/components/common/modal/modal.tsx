import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as S from '@/components/common/modal/modal.style';

import Delete from '@/assets/icons/delete.svg?react';

type TModalProps = {
  isOpen?: boolean;
  title?: string;
  children: ReactNode;
  isExitButtonVisible?: boolean;
  onClose: () => void;
  clickOutside?: boolean;
};

export default function Modal({ isOpen = true, children, title, onClose, isExitButtonVisible = true, clickOutside }: TModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return createPortal(
    isVisible && (
      <S.Container onClick={clickOutside ? onClose : undefined}>
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
              <S.Button onClick={onClose}>
                <Delete width={20} height={20} />
              </S.Button>
            )}
          </S.TitleWrapper>
          {children}
        </S.Wrapper>
      </S.Container>
    ),
    document.getElementById('modal')!,
  );
}
