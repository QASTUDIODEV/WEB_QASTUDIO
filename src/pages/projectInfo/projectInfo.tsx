import { useReducer } from 'react';

import { useDispatch } from '@/hooks/common/useCustomRedux.ts';

import Button from '@/components/common/button/button';
import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider.tsx';
import Profile from '@/components/common/profile/profile';

import Plus from '@/assets/icons/add.svg?react';
import Goto from '@/assets/icons/arrow_goto.svg?react';
import ArrowRight from '@/assets/icons/arrow_right.svg?react';
import Book from '@/assets/icons/book.svg?react';
import Branch from '@/assets/icons/branch_white.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import File from '@/assets/icons/files.svg?react';
import NextJs from '@/assets/icons/nextjs.svg?react';
import Page from '@/assets/icons/page.svg?react';
import Rights from '@/assets/icons/shield.svg?react';
import Web from '@/assets/icons/web.svg?react';
import * as S from '@/pages/projectInfo/projectInfo.style';
import ProjectStructure from '@/pages/projectInfo/projectStructure';
import { openModal } from '@/slices/modalSlice.ts';

const initialState = {
  isStructureVisible: true,
  selectedPage: '홈',
  isEdit: false,
  content: '사용자가 학습 로드맵을 생성하고 이를 직관적으로 확인할 수 있도록 지원합니다.\n(두줄까지 들어갈 수 있습니다.)',
  preContent: '',
};

type TAction =
  | { type: 'TOGGLE_STRUCTURE' }
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'TOGGLE_EDIT'; payload?: boolean }
  | { type: 'SET_PRE_CONTENT'; payload: string }
  | { type: 'SET_CONTENT'; payload: string };

function reducer(state: typeof initialState, action: TAction) {
  switch (action.type) {
    case 'TOGGLE_STRUCTURE':
      return { ...state, isStructureVisible: !state.isStructureVisible };
    case 'SET_PAGE':
      return { ...state, selectedPage: action.payload };
    case 'TOGGLE_EDIT':
      return { ...state, isEdit: action.payload ?? !state.isEdit };
    case 'SET_PRE_CONTENT':
      return { ...state, preContent: action.payload, isEdit: true };
    case 'SET_CONTENT':
      return { ...state, content: action.payload, isEdit: false };
    default:
      return state;
  }
}
export default function ProjectInfoPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const modalDispatch = useDispatch();

  const data = {
    page: ['홈', '로그인', '로드맵', '마이페이지', '마이페이지'],
    path: ['/', '/login', '/roadmap', '/mypage', '/mypage'],
    accessRights: [
      [true, true, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
    ],
    character: ['일반', '관리자', '비로그인'],
  };

  const accessed = data.page.map((_, i) => data.accessRights[i].map((isAccessible, j) => (isAccessible ? data.character[j] : null)).filter(Boolean));
  const notAccessed = data.page.map((_, i) => data.accessRights[i].map((isAccessible, j) => (!isAccessible ? data.character[j] : null)).filter(Boolean));
  const member = [
    {
      name: '핑퐁',
      userImage: 'https://picsum.photos/100',
      Master: true,
    },
    {
      name: '뿡빵이',
      userImage: 'https://picsum.photos/100',
      Master: false,
    },
    {
      name: '길이가 길면 끊어주세요요요요요요요요',
      userImage: 'https://picsum.photos/100',
      Master: false,
    },
  ];

  return (
    <S.Container>
      <S.Profile>
        <S.ProfileWrapper>
          <Profile />
        </S.ProfileWrapper>
        <S.ProfileName>UMC_PM_DAY</S.ProfileName>
        <S.Wrapper top="5.6px" right="0" className="buttonShow">
          <Button type="normal" color="default" icon={<Goto />} iconPosition="right">
            Go to Site
          </Button>
        </S.Wrapper>
        <NextJs />
        <Web />
      </S.Profile>
      <S.Box height="18%">
        <S.Title>Introduction to the Project</S.Title>
        {!state.isEdit ? (
          <>
            <S.Text>{state.content}</S.Text>
            <S.Wrapper bottom="16px" right="24px">
              <Button type="normal" color="default" icon={<Edit />} iconPosition="left" onClick={() => dispatch({ type: 'TOGGLE_EDIT', payload: true })}>
                Edit
              </Button>
            </S.Wrapper>
          </>
        ) : (
          <>
            <S.Input onChange={(e) => dispatch({ type: 'SET_PRE_CONTENT', payload: e.target.value })} value={state.preContent} />
            <S.Wrapper bottom="16px" right="24px">
              <Button
                type="normal"
                color="default"
                icon={<Edit />}
                iconPosition="left"
                onClick={() => dispatch({ type: 'SET_CONTENT', payload: state.preContent })}
              >
                Done
              </Button>
            </S.Wrapper>
          </>
        )}
      </S.Box>
      <S.SemiBox>
        <S.Left>
          {state.isStructureVisible ? (
            <S.Box
              height="58%"
              style={{
                cursor: 'pointer',
              }}
            >
              <S.Title>Project structure</S.Title>
              <S.TextBold>Summary</S.TextBold>
              <S.Wrapper top="16px" right="24px">
                <Plus onClick={() => modalDispatch(openModal(MODAL_TYPES.CreatePageModal))} />
              </S.Wrapper>
              <S.InnerBox>
                <div style={{ flex: 1 }}>
                  <S.Table>
                    <thead>
                      <tr>
                        <S.TH>
                          <File /> Page
                        </S.TH>
                        <S.TH>
                          <Branch /> Path
                        </S.TH>
                        <S.TH>
                          <Rights /> Access Rights
                        </S.TH>
                      </tr>
                    </thead>
                    <tbody>
                      {data.page.map((page, index) => (
                        <S.TR
                          key={index}
                          onClick={() => {
                            dispatch({ type: 'TOGGLE_STRUCTURE' });
                            dispatch({ type: 'SET_PAGE', payload: page });
                          }}
                        >
                          <S.TD>{page}</S.TD>
                          <S.TD>{data.path[index]}</S.TD>
                          <S.TD>
                            <S.AccessRights>
                              <Button type="small_round" color="green">
                                접근 가능
                              </Button>
                              {accessed[index].map((role, i) => (
                                <Button key={i} type="small_round" color="white_round">
                                  {role}
                                </Button>
                              ))}
                              <Button type="small_round" color="red">
                                접근 불가능
                              </Button>
                              {notAccessed[index].map((role, i) => (
                                <Button key={i} type="small_round" color="white_round">
                                  {role}
                                </Button>
                              ))}
                            </S.AccessRights>
                          </S.TD>
                        </S.TR>
                      ))}
                    </tbody>
                  </S.Table>
                </div>
              </S.InnerBox>
            </S.Box>
          ) : (
            <ProjectStructure
              selectedPage={state.selectedPage}
              setSelectedPage={(page) => dispatch({ type: 'SET_PAGE', payload: page })}
              onBackToSummary={() => dispatch({ type: 'TOGGLE_STRUCTURE' })}
            />
          )}
          <S.Box height="35%">
            <S.Title>Character</S.Title>
            <S.Character>
              <S.CharacterBox>
                <S.Medium18Text>Origin</S.Medium18Text>
                <S.Medium14Text>dklasalfjdssfd.</S.Medium14Text>
                <S.rowBox>
                  <Book />
                  <S.Medium18Text>3</S.Medium18Text>
                  <Page />
                  <S.Medium18Text>2</S.Medium18Text>
                </S.rowBox>
              </S.CharacterBox>
              <S.CharacterBox>
                <S.Medium18Text>Admin</S.Medium18Text>
                <S.Medium14Text>관리자는 어쩌구...</S.Medium14Text>
                <S.rowBox>
                  <Book />
                  <S.Medium18Text>3</S.Medium18Text>
                  <Page />
                  <S.Medium18Text>2</S.Medium18Text>
                </S.rowBox>
              </S.CharacterBox>
              <S.CharacterAddBox onClick={() => modalDispatch(openModal(MODAL_TYPES.CharacterModal))}>
                <Plus />
              </S.CharacterAddBox>
            </S.Character>
          </S.Box>
        </S.Left>
        <S.Right>
          <S.Box height="100%">
            <S.Title>Team Members</S.Title>
            {member.map((a, i) => (
              <S.Member key={i}>
                <S.MemberBox>
                  <S.ProfileWrapper>
                    <Profile profileImg={a.userImage} />
                  </S.ProfileWrapper>
                  <S.MemberName>{a.name}</S.MemberName>
                  {a.Master && <Crown />}
                </S.MemberBox>
                <S.ArrowWrapper>
                  <ArrowRight className="show" />
                </S.ArrowWrapper>
              </S.Member>
            ))}
            <S.Wrapper bottom="16px" right="24px">
              <Button type="normal" color="default" icon={<Plus />} iconPosition="left" onClick={() => modalDispatch(openModal(MODAL_TYPES.InviteModal))}>
                Invite
              </Button>
            </S.Wrapper>
          </S.Box>
        </S.Right>
      </S.SemiBox>
    </S.Container>
  );
}
