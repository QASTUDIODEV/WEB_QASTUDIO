const nicknamePattern = /^[a-zA-Z]{1,9}$/;

function validateNickname(nickname: string) {
  const errors: string[] = [];

  if (!nickname) {
    errors.push('Nickname is required.');
  } else if (nickname.length > 21) {
    errors.push('닉네임은 20자 이하여야 합니다.');
  } else if (!nicknamePattern.test(nickname)) {
    errors.push('닉네임은 영어만 허용됩니다.');
  }
  return errors;
}

function validateEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return 'Emails are required.';
  } else if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return ''; // 유효한 이메일
}

function validatePassword(password: string): string {
  if (!password) {
    return 'Password is required.';
  } else if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  return ''; // 유효한 비밀번호
}

function validateRepassword(password: string, repassword: string): string {
  if (!repassword) {
    return 'Confirmation password is required.';
  } else if (password !== repassword) {
    return 'The Password is not correct';
  }
  return '';
}
export { validateEmail, validateNickname, validatePassword, validateRepassword };
