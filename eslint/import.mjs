import eslintImport from 'eslint-plugin-import';
import eslintName from 'eslint-plugin-import-name';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default {
  plugins: {
    'simple-import-sort': simpleImportSort,
    'import': eslintImport,
    'import-name': eslintName,
  },
  rules: {
    // 패키지명을 camelCase화해서 사용하도록 강제하여 코드의 일관성을 유지합니다.
    // 예외적으로 react와 clsx는 별도의 명명 규칙을 따릅니다.
    'import-name/all-imports-name': [
      'error',
      {
        clsx: 'cx',
      },
    ],
    // 유사한 항목을 그룹으로 묶어서 import를 정렬합니다.
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports: Place imports with side effects first.
          ['^\\u0000'],
          // Node.js built-in modules.
          ['^(assert|buffer|child_process|crypto|dns|events|fs|http|https|net|os|path|querystring|stream|tls|url|util|zlib)(/|$)'],
          // Packages: react related packages come first, then other packages.
          ['^react', '^@?\\w'],
          // Aliased imports: Project path aliases.
          ['^@/types', '^@/constants', '^@/enums'],
          ['^@/libs', '^@/utils', '^@/apis'],
          ['^@/stores', '^@/hooks'],
          ['^@/components'],
          // Relative imports: Imports from the same folder first, then parent folders.
          ['^\\./', '^\\.\\./'],
          // Static asset imports: SVG files, JSON files.
          ['^.+\\.svg$', '^.+\\.json$'],
          // Style imports: CSS files.
          ['^.+\\.style.ts$'],
        ],
      },
    ],

    // export를 정렬하여 가독성을 높입니다.
    'simple-import-sort/exports': 'error',
    // import 문을 문서의 상단에 위치시켜 코드 구조를 일관되게 유지합니다.
    'import/first': 'error',

    // import 문 다음에 빈 줄을 삽입하여 코드의 가독성을 높입니다.
    'import/newline-after-import': 'error',

    // 중복된 import를 허용하지 않습니다.
    'import/no-duplicates': 'error',

    // import 플러그인으로도 정렬을 강제할 수 있지만, order group 지정을 더 간편하게 할 수 있는 simple-import-sort 플러그인을 대신 사용합니다.
    'import/order': 'off',

    // 한 파일에 여러 개의 export가 늘어날 가능성을 고려하여 default export를 사용하지 않습니다.
    // 이는 명명된 export를 사용하여 모듈의 재사용성을 높이고, 코드의 가독성을 향상시킵니다.
    'import/prefer-default-export': 'off',
  },
};
