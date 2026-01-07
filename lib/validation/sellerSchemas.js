import { z } from 'zod';
import {
  RESERVED_USERNAMES,
  DISPOSABLE_EMAIL_DOMAINS,
  VALIDATION_LIMITS,
  VALIDATION_REGEX
} from '@/lib/constants/validation';

export const sellerOnboardingSchema = z.object({
  username: z
    .string()
    .min(VALIDATION_LIMITS.USERNAME_MIN, `Username must be at least ${VALIDATION_LIMITS.USERNAME_MIN} characters`)
    .max(VALIDATION_LIMITS.USERNAME_MAX, `Username must not exceed ${VALIDATION_LIMITS.USERNAME_MAX} characters`)
    .regex(VALIDATION_REGEX.USERNAME, 'Username can only contain letters, numbers, and underscores')
    .refine(
      (val) => !RESERVED_USERNAMES.includes(val.toLowerCase()),
      'This username is reserved and cannot be used'
    )
    .refine(
      (val) => !VALIDATION_REGEX.ONLY_NUMBERS.test(val),
      'Username cannot consist of only numbers'
    ),

  password: z
    .string()
    .min(VALIDATION_LIMITS.PASSWORD_MIN, `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN} characters`)
    .max(VALIDATION_LIMITS.PASSWORD_MAX, 'Password is too long')
    .regex(VALIDATION_REGEX.PASSWORD_LOWERCASE, 'Password must contain at least one lowercase letter')
    .regex(VALIDATION_REGEX.PASSWORD_UPPERCASE, 'Password must contain at least one uppercase letter')
    .regex(VALIDATION_REGEX.PASSWORD_NUMBER, 'Password must contain at least one number')
    .regex(VALIDATION_REGEX.PASSWORD_SPECIAL, 'Password must contain at least one special character'),

  firstName: z
    .string()
    .min(VALIDATION_LIMITS.NAME_MIN, `First name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`)
    .max(VALIDATION_LIMITS.NAME_MAX, `First name must not exceed ${VALIDATION_LIMITS.NAME_MAX} characters`)
    .regex(VALIDATION_REGEX.NAME, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform((val) => val.trim())
    .refine((val) => val.length >= VALIDATION_LIMITS.NAME_MIN, 'First name is required'),

  lastName: z
    .string()
    .min(VALIDATION_LIMITS.NAME_MIN, `Last name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`)
    .max(VALIDATION_LIMITS.NAME_MAX, `Last name must not exceed ${VALIDATION_LIMITS.NAME_MAX} characters`)
    .regex(VALIDATION_REGEX.NAME, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform((val) => val.trim())
    .refine((val) => val.length >= VALIDATION_LIMITS.NAME_MIN, 'Last name is required'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .refine(
      (val) => {
        const domain = val.split('@')[1];
        return domain && !DISPOSABLE_EMAIL_DOMAINS.includes(domain);
      },
      'Disposable email addresses are not allowed'
    )
});
