import { z } from 'zod';

const nicknamePattern = /^[a-zA-Z0-9가-힣]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;

// Zod 스키마 정의

export const signupSchema = z.object({
  email: z.string().nonempty('Required.').regex(emailRegex, 'Must be email format'),
  password: z
    .string()
    .min(8, '8-20 chars, letters, numbers, symbols.')
    .max(20, '8-20 chars, letters, numbers, symbols.')
    .regex(passwordRegex, '8-20 chars, letters, numbers, symbols.')
    .nonempty('Required.'),
  repassword: z.string().min(8, '8-20 chars, letters, numbers, symbols.').max(20, '8-20 chars, letters, numbers, symbols.').nonempty('Required.'),
  code: z.string().nonempty('Required'),
});

export const findingSchema = z.object({
  email: z.string().nonempty('Required.').regex(emailRegex, 'Must be email format'),
  password: z
    .string()
    .min(8, '8-20 chars, letters, numbers, symbols.')
    .max(20, '8-20 chars, letters, numbers, symbols.')
    .regex(passwordRegex, '8-20 chars, letters, numbers, symbols.')
    .nonempty('Required.'),
  repassword: z.string().min(8, '8-20 chars, letters, numbers, symbols.').max(20, '8-20 chars, letters, numbers, symbols.').nonempty('Required.'),
  code: z.string().nonempty('Required'),
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

export const userSettingSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required.').max(20, 'Invalid format.').regex(nicknamePattern, 'Invalid format.'),
});

export const myPageScehma = z.object({
  nickname: z.string().min(1, 'Nickname is required.').max(20, 'Invalid format.').regex(nicknamePattern, 'Invalid format.'),
});

export const createCharacterModalScehma = z.object({
  characterName: z.string().min(1, 'Required.'),
  characterDescription: z.string().min(1, 'Required.'),
  accessPage: z.array(z.string()).nonempty('At least one page is required.'),
});

export const projectModalSchema = z.object({
  projectName: z.string().min(3, { message: 'Project name must be at least 3 characters.' }).nonempty({ message: 'Project name is required.' }),
  projectUrl: z.string().url({ message: 'Enter a valid URL.' }).nonempty({ message: 'Project URL is required.' }),
  email: z
    .string()
    .optional() // 빈 문자열 허용
    .refine((value) => value === '' || emailRegex.test(value!), {
      message: 'Must be email format',
    }),
});
