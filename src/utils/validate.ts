const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;

function validateNickname(nickname: string) {
  const errors: string[] = [];

  if (!nickname) {
    errors.push('Nickname is required.');
  } else if (nickname.length > 20) {
    errors.push('Invalid format.');
  } else if (!nicknamePattern.test(nickname)) {
    errors.push('Invalid format.');
  }

  return errors;
}

function validateEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return 'Required.';
  } else if (!emailRegex.test(email)) {
    return 'Must be email format';
  }
  return ''; // 유효한 이메일
}

function validatePassword(password: string): string {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;

  if (!password) {
    return 'Required.';
  } else if (password.length < 8 || password.length > 20) {
    return '8-20 chars, letters, numbers, symbols.';
  } else if (!regex.test(password)) {
    return '8-20 chars, letters, numbers, symbols.';
  }

  return ''; // 유효한 비밀번호
}

function validateRepassword(password: string, repassword: string): string {
  if (!repassword) {
    return 'Passwords must match.';
  } else if (password !== repassword) {
    return 'Passwords must match.';
  }
  return '';
}

function validateCode(enterCode: string, code: string): string {
  if (!enterCode) {
    return 'Required';
  } else if (enterCode !== code) {
    return 'Invalid code';
  } else {
    return '';
  }
}

function validateNotBlankCode(code: string): string {
  if (!code) {
    return 'Required';
  } else {
    return '';
  }
}

export { validateCode, validateEmail, validateNickname, validateNotBlankCode, validatePassword, validateRepassword };
