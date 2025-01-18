module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix', // 버그, 오류 해결
        'add', // Feat 이외의 부수적인 코드 추가/라이브러리 추가
        'feat', // 새로운 기능 구현
        'del', // 쓸모없는 코드 삭제
        'remove', // 파일 삭제
        'refactor', // 내부 로직은 변경하지 않고, 기존의 코드를 개선하는 리팩토링 / 세미콜론 줄바꿈 포함
        'chore', // 그 이외의 잡일/버전 코드 수정, 패키지 구조 변경, 파일 이동, 가독성이나 변수명, reformat 등
        'comment', // 필요한 주석 추가 및 변경
        'docs', // README나 wiki 등 내용 추가 및 변경
        'test', // 테스트 코드 추가
      ],
    ],
    'subject-case': [0],
  },
};
