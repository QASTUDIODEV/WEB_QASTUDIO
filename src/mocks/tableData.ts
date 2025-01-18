export type TTableData = {
  date: string;
  name: string;
  page: string;
  attainment: number;
  state: string;
  time: string;
  user: string;
  action: boolean;
};

export const tableData: TTableData[] = [
  {
    date: '2024. 12. 21',
    name: '회원가입',
    page: '(1)회원가입',
    attainment: 80,
    state: 'Success',
    time: '2.5s',
    user: '핑퐁',
    action: true,
  },
  {
    date: '2024. 12. 21',
    name: '회원가입',
    page: '(1)회원가입',
    attainment: 80,
    state: 'Success',
    time: '2.5s',
    user: '핑퐁',
    action: true,
  },
  {
    date: '2024. 12. 21',
    name: '토큰 테스트',
    page: '(2)로그인',
    attainment: 50, // string → number로 변환
    state: 'Fail',
    time: '2.5s',
    user: '핑퐁',
    action: false,
  },
  {
    date: '2024. 12. 21',
    name: '로그인',
    page: '(2)로그인',
    attainment: 90,
    state: 'Success',
    time: '3s',
    user: '핑퐁',
    action: true,
  },
  {
    date: '2024. 12. 21',
    name: '테스트4',
    page: '(4)캘린더',
    attainment: 64,
    state: 'Fail',
    time: '5s',
    user: '핑퐁',
    action: false,
  },
  {
    date: '2024. 12. 21',
    name: '테스트3',
    page: '(3)메인',
    attainment: 30,
    state: 'Success',
    time: '10s',
    user: '핑퐁',
    action: true,
  },
];
