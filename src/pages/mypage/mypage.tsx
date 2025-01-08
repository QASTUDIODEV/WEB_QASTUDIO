import React, { useRef, useState } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';
import Profile from '@/components/common/profile/profile';

import ArrowLeft from '@/assets/icons/arrow_left.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Done from '@/assets/icons/done.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Package from '@/assets/icons/package.svg?react';
import * as S from '@/pages/mypage/mypage.style';

export default function MyPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [nickname, setNickname] = useState('기존 닉네임');
  const projects = [
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    { name: 'UMC_PM_DAY', participants: '12', date: '2025.01.09' },
    // 테스트 용, 추후 삭제 예정
  ];
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault();
    contentInputRef.current?.click();
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleDoneClick = () => {
    setIsEdit(false);
  };
  return (
    <S.Container>
      <span>My Page</span>
      <S.ProfileWrapper>
        <div style={{ display: 'flex', gap: '20px' }}>
          <S.ProfileImg onClick={handleInputClick}>
            <Profile />
            <S.ProfileEditBtn>
              {/* 아이콘은 추후에 수정하겠습니다..... */}
              <Edit />
            </S.ProfileEditBtn>
          </S.ProfileImg>
          <input className="profile-image-upload" ref={contentInputRef} type="file" accept="image/*" tabIndex={-1} style={{ display: 'none' }} />
          {isEdit ? (
            <S.UserInfo>
              <Input value={nickname} width="268px" onChange={handleNicknameChange} />
              <S.Account>email.email.com</S.Account>
              {/* 소셜 로그인 아이콘 추가 예정 */}
            </S.UserInfo>
          ) : (
            <S.UserInfo>
              <span>{nickname}</span>
              <S.Account>email.email.com</S.Account>
              {/* 소셜 로그인 아이콘 추가 예정 */}
            </S.UserInfo>
          )}
        </div>
        {isEdit ? (
          <div>
            <Button type="small_square" color="default" disabled={false} icon={<Done />} iconPosition="left" onClick={handleDoneClick}>
              Done
            </Button>
          </div>
        ) : (
          <div>
            <Button type="small_square" color="default" disabled={false} icon={<Edit />} iconPosition="left" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          </div>
        )}
      </S.ProfileWrapper>

      <S.Projects>
        <S.ProjectNum>
          <Package />
          <div className="ProjectNumber">3</div>
          <span>Projects in progress</span>
        </S.ProjectNum>
        <S.ProjectList>
          <div style={{ flex: '1' }}>
            <S.Table>
              <thead>
                <tr>
                  <S.TH style={{ paddingRight: '2rem' }}>Project Name</S.TH>
                  <S.TH style={{ paddingRight: '2rem' }}>Participants</S.TH>
                  <S.TH>Last Modified Date</S.TH>
                </tr>
              </thead>
              <S.TBody>
                {projects.map((project, index) => (
                  <S.TR key={index}>
                    <S.TD>
                      <S.ProjectNameTD>
                        <div className="ProfileWrapper">
                          <Profile />
                        </div>
                        {project.name}
                      </S.ProjectNameTD>
                    </S.TD>
                    <S.TD>{project.participants}</S.TD>
                    <S.TD>{project.date}</S.TD>
                  </S.TR>
                ))}
              </S.TBody>
            </S.Table>
          </div>

          <S.Buttons>
            {/* 이전/다음 페이지가 없는 경우 #DFE8F9 10%로 설정 */}
            <ArrowLeft />
            <ArrowRight />
          </S.Buttons>
        </S.ProjectList>
      </S.Projects>
    </S.Container>
  );
}
