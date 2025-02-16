export enum DEVICE {
  PC = 'PC',
  MOBILE = 'MOBILE',
}

export enum STACK {
  NEXT = 'NEXT',
  REACT = 'REACT',
  JS = 'JS',
}

// 시나리오 실행
export enum ACTION_STATE {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  IN_PROGRESS = 'IN_PROGRESS',
  UNVERIFIED = 'UNVERIFIED',
}
export enum ACTION_TYPE {
  NAVIGATE = 'navigate',
  CLICK = 'click',
  SEND_KEYS = 'send_keys',
}

//소셜 로그인
export enum SOCIAL {
  KAKAO = 'KAKAO',
  GITHUB = 'GITHUB',
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

export enum TEST_STATE {
  ALL = 'ALL',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}
