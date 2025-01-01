import jsxA11y from 'eslint-plugin-jsx-a11y'

export default {
  plugins: {
    'jsx-a11y': jsxA11y,
  },
  rules: {
    // 비상호작용 엘리먼트에 상호작용 역할을 할당하는 것을 허용합니다.
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',

    // click 이벤트에 key 이벤트가 없을 때 허용합니다.
    'jsx-a11y/click-events-have-key-events': 'off',

    // 비상호작용 엘리먼트에서 상호작용을 허용합니다.
    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    // devDependencies 사용을 허용합니다.
    'no-extraneous-dependencies': 'off',

    // div에 onClick 이벤트 사용을 허용합니다.
    'jsx-a11y/no-static-element-interactions': 'off',

    // console.log(), console.warn(), console.error()를 사용할 때 경고를 표시합니다.
    'no-console': 'warn',

    // 가능한 경우 dot notation을 사용하도록 경고를 표시합니다.
    'dot-notation': 'warn',

    // 사용하지 않는 변수에 대해 경고를 표시합니다.
    'no-unused-vars': 'warn',

    '@typescript-eslint/no-explicit-any': 'off',
  },
}
