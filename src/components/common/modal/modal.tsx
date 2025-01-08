import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import { usePortal } from '@/hooks/common/usePortal';

import * as S from '@/components/common/modal/modal.style';

import Delete from '@/assets/icons/delete.svg?react';

/**
 * Modal 컴포넌트
 * @param children Modal 내부의 컨텐츠
 * @param title X버튼 옆 title
 */

type TModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose, title }: TModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const portal = usePortal('modal');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return portal(
    isVisible && (
      <S.Container onClick={onClose}>
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
          {/* Modal Header */}
          <S.TitleWrapper>
            <S.Title>{title}</S.Title>
            <S.Button onClick={onClose}>
              <Delete width={20} height={20} />
            </S.Button>
          </S.TitleWrapper>
          {/* Modal Content */}
          {children}
        </S.Wrapper>
      </S.Container>
    ),
  );
}
