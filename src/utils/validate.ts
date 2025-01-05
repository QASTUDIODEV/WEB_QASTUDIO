const nicknamePattern = /^[a-zA-Z]{1,9}$/;

function validateNickname(nickname: string) {
  const errors: string[] = [];

  if (!nickname) {
    errors.push('닉네임을 반드시 입력해주세요.');
  } else if (nickname.length > 10) {
    errors.push('닉네임은 10자 이하여야 합니다.');
  } else if (!nicknamePattern.test(nickname)) {
    errors.push('닉네임은 영어만 입력 가능합니다');
  }
  return errors;
}

function validateEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return ''; // 유효한 이메일
}

function validatePassword(password: string): string {
  if (!password) {
    return '비밀번호를 입력해주세요.';
  } else if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  return ''; // 유효한 비밀번호
}
export { validateEmail, validateNickname, validatePassword };
