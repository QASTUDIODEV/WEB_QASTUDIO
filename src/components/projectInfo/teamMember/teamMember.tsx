import type { TInfoDTO } from '@/types/projectInfo/projectInfo';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';
import { useProjectInfo } from '@/hooks/projectInfo/useProjectInfo';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import Profile from '@/components/common/profile/profile';
import * as S from '@/components/projectInfo/teamMember/teamMember.style';

import Menu from '../menu/menu';

import Plus from '@/assets/icons/add.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import MenuDark from '@/assets/icons/menu_dark.svg?react';
import MoreInfo from '@/assets/icons/moreInfo.svg?react';
import { openModal } from '@/slices/modalSlice.ts';

export default function TeamMember({ result }: TInfoDTO) {
  const modalDispatch = useDispatch();
  const { useGetProjectMember } = useProjectInfo({ projectId: Number(result?.projectId) });
  const { data: members } = useGetProjectMember;
  const member = members?.result.members;
  const unAcceptedMember = members?.result.unacceptedMembers;

  return (
    <>
      <S.Title>Team Members</S.Title>
      <S.MemberContainer>
        {member?.map((a, i) => (
          <S.Member key={i}>
            <S.MemberBox>
              <S.ProfileWrapper>
                <Profile profileImg={a.profileImage} />
              </S.ProfileWrapper>
              <S.MemberName>{a.nickname}</S.MemberName>
              {a.projectRole === 'LEADER' && <Crown />}
            </S.MemberBox>
            <Menu userId={a.userId} isLeader={result?.isLeader || false} email={a.email} projectId={Number(result?.projectId)}>
              <MoreInfo style={{ cursor: 'pointer' }} />
            </Menu>
          </S.Member>
        ))}
        {unAcceptedMember?.map((a, i) => (
          <>
            <S.Member key={i}>
              <S.MemberBox>
                <S.UnacceptedWrapper>
                  <Profile />
                </S.UnacceptedWrapper>
                <S.UnacceptedName>{a}</S.UnacceptedName>
              </S.MemberBox>
              {result?.isLeader ? (
                <Menu isLeader={result?.isLeader} projectId={Number(result?.projectId)} email={a}>
                  <MenuDark />
                </Menu>
              ) : (
                <MenuDark />
              )}
            </S.Member>
          </>
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
