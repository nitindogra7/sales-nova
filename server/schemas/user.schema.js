import { z } from 'zod';

// for register
export const registerSchema = z.object({
  username: z.string({ required_error: 'username required' }).min(3),
  companyName: z.string({ required_error: 'company name required' }).min(2),
  email: z.string({ required_error: 'email required' }).email(),
  password: z
    .string({ required_error: 'password required' })
    .min(6, 'password must be at least 6 characters')
    .max(12, 'password too long max 12 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,12}$/,
      'Password must be 6 characters ,contain uppercase , special character , number'
    ),
});

// for login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: 'password required' })
    .min(6, 'password must be at least 6 characters')
    .max(12, 'password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,12}$/,
      'Password must be strong'
    ),
});
