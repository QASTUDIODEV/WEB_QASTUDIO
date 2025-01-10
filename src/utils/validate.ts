import { z } from 'zod';

const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;

// Zod 스키마 정의

export const signupSchema = z
  .object({
    email: z.string().nonempty('Required.').regex(emailRegex, 'Must be email format'),
    password: z
      .string()
      .min(8, '8-20 chars, letters, numbers, symbols.')
      .max(20, '8-20 chars, letters, numbers, symbols.')
      .regex(passwordRegex, '8-20 chars, letters, numbers, symbols.')
      .nonempty('Required.'),
    repassword: z.string().min(8, '8-20 chars, letters, numbers, symbols.').max(20, '8-20 chars, letters, numbers, symbols.').nonempty('Required.'),
    code: z.string().nonempty('Required'),
    nickname: z.string().min(1, 'Nickname is required.').max(20, 'Invalid format.').regex(nicknamePattern, 'Invalid format.'),
  })
  .refine(({ password, repassword }) => password !== repassword, { message: 'Passwords must match.', path: ['repassword'] });

export const findingSchema = z
  .object({
    email: z.string().nonempty('Required.').regex(emailRegex, 'Must be email format'),
    password: z
      .string()
      .min(8, '8-20 chars, letters, numbers, symbols.')
      .max(20, '8-20 chars, letters, numbers, symbols.')
      .regex(passwordRegex, '8-20 chars, letters, numbers, symbols.')
      .nonempty('Required.'),
    repassword: z.string().min(8, '8-20 chars, letters, numbers, symbols.').max(20, '8-20 chars, letters, numbers, symbols.').nonempty('Required.'),
    code: z.string().nonempty('Required'),
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Passwords must match.',
    path: ['repassword'],
  });

export const loginSchema = z.object({
  email: z.string().nonempty('Required.').regex(emailRegex, 'Must be email format'),
  password: z
    .string()
    .min(8, '8-20 chars, letters, numbers, symbols.')
    .max(20, '8-20 chars, letters, numbers, symbols.')
    .regex(passwordRegex, '8-20 chars, letters, numbers, symbols.')
    .nonempty('Required.'),
});

//refine이 작동을 안함.. 이유는 모름... whyrano
