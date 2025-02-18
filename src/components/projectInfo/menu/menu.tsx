import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import * as S from '@/components/projectInfo/menu/menu.style';

import { openModal } from '@/slices/modalSlice.ts';

export type TMenuProps = {
  children: React.ReactNode;
  userId?: number;
  isLeader?: boolean;
};

export default function Menu({ children, userId, isLeader }: TMenuProps) {
  const modalDispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    }

    function handleScroll() {
      setVisible(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom - 30,
        left: rect.left + 30,
      });
    }
    setVisible((prev) => !prev);
  };

  return (
    <S.Container ref={buttonRef} onClick={handleToggle}>
      {children}
      {isLeader &&
        visible &&
        ReactDOM.createPortal(
          <S.Menu ref={menuRef} style={{ top: menuPosition.top, left: menuPosition.left }}>
            {/* modalProps: { projectId: projectId, character: character } */}
            <S.Option onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.ChangeOwnerModal }))}>Owner</S.Option>
            <S.Option onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.DeleteTeamMember }))}>Remove</S.Option>
            {userId && <S.Last onClick={() => navigate(`/userInfo/${userId}`)}>MyPage</S.Last>}
          </S.Menu>,
          document.body,
        )}
    </S.Container>
  );
}
