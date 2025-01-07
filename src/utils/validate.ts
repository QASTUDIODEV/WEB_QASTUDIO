const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;

function validateNickname(nickname: string) {
  if (!nickname) {
    return 'Nickname is required.';
  } else if (nickname.length > 20) {
    return 'Invalid format.';
  } else if (!nicknamePattern.test(nickname)) {
    return 'Invalid format.';
  }

  return '';
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

function validateCode(code: string): string {
  if (!code) {
    return 'Required';
  } else {
    return '';
  }
}
function validateMatchCode(enterCode: string, code: string): string {
  if (!enterCode) {
    return 'Required';
  } else if (enterCode !== code) {
    return 'Invalid code';
  } else {
    return '';
  }
}
type TSignup = {
  email: string;
  password: string;
  repassword: string;
  code: string;
  nickname: string;
  authCode: string;
};

type TLogin = {
  email: string;
  password: string;
};

type TFinding = {
  email: string;
  password: string;
  repassword: string;
  code: string;
  authCode: string;
};

function validateSignup(values: TSignup) {
  const errors = {
    email: '',
    password: '',
    repassword: '',
    code: '',
    nickname: '',
    authCode: '',
  };

  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);
  errors.repassword = validateRepassword(values.password, values.repassword);
  errors.code = validateCode(values.code);
  errors.authCode = validateMatchCode(values.code, values.authCode);
  errors.nickname = validateNickname(values.nickname);
  return errors;
}

function validateFinding(values: TFinding) {
  const errors = {
    email: '',
    password: '',
    repassword: '',
    code: '',
    authCode: '',
  };

  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);
  errors.repassword = validateRepassword(values.password, values.repassword);
  errors.code = validateCode(values.code);
  errors.authCode = validateMatchCode(values.code, values.authCode);

  return errors;
}

function validateLogin(values: TLogin) {
  const errors = {
    email: '',
    password: '',
  };

  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  return errors;
}
export { validateFinding, validateLogin, validateSignup };
