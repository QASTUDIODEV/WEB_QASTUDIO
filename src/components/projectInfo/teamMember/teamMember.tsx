import { useNavigate } from 'react-router-dom';

import type { TInfoDTO } from '@/types/projectInfo/projectInfo';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import Profile from '@/components/common/profile/profile';
import * as S from '@/components/projectInfo/teamMember/teamMember.style';

import Plus from '@/assets/icons/add.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function TeamMember({ result }: TInfoDTO) {
  const modalDispatch = useDispatch();
  const navigate = useNavigate();
  const { useGetProjectMember } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: members } = useGetProjectMember;
  const member = members?.result.members;
  return (
    <>
      <S.Title>Team Members</S.Title>
      <S.MemberContainer>
        {member?.map((a, i) => (
          <S.Member key={i} onClick={() => navigate(`/userInfo/${a.userId}`)}>
            <S.MemberBox>
              <S.ProfileWrapper>
                <Profile profileImg={a.profileImage} />
              </S.ProfileWrapper>
              <S.MemberName>{a.nickname}</S.MemberName>
              {a.projectRole === 'LEADER' && <Crown />}
            </S.MemberBox>
            <S.ArrowWrapper>
              <ArrowRight />
            </S.ArrowWrapper>
          </S.Member>
        ))}
      </S.MemberContainer>
      <S.Wrapper>
        <Button
          type="normal"
          color="default"
          icon={<Plus />}
          iconPosition="left"
          onClick={() => modalDispatch(openModal({ modalType: MODAL_TYPES.InviteModal, modalProps: { projectId: Number(result?.projectId) } }))}
        >
          Invite
        </Button>
      </S.Wrapper>
    </>
  );
}
