import { email, z } from 'zod';

export const otpSchema = z.object({
  stringOtp: z.string({ required_error: 'otp required' }).min(6).max(6),
  id: z.string(),
});
