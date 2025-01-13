import { useEffect, useRef, useState } from 'react';

import Profile from '@/components/common/profile/profile';
import * as S from '@/components/mypage/project/project.style';

type TProject = {
  id: number;
  name: string;
  participants: number;
  date: string;
};

export default function Project({ id, name, participants, date }: TProject) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (spanRef.current) {
        setIsOverflowing(spanRef.current.scrollWidth > spanRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <S.TR key={id}>
      <S.TD>
        <S.ProjectNameTD>
          <div className="ProfileWrapper">
            <Profile />
          </div>
          <span ref={spanRef}>{name}</span>
          {isOverflowing && <div className="dropdown">{name}</div>}
        </S.ProjectNameTD>
      </S.TD>
      <S.TD>{participants}</S.TD>
      <S.TD>{date}</S.TD>
    </S.TR>
  );
}
