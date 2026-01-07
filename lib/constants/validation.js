/**
 * Validation constants for user input
 */

// Reserved usernames that cannot be used
export const RESERVED_USERNAMES = [
    'admin',
    'administrator',
    'root',
    'seller',
    'sellers',
    'system',
    'support',
    'help',
    'helpdesk',
    'staff',
    'moderator',
    'mod',
    'owner',
    'api',
    'official',
    'service',
    'null',
    'undefined',
    'test',
    'demo',
    'guest',
    'user',
    'users',
    'customer',
    'customers',
    'account',
    'accounts',
    'ecommie',
    'ecommerce'
];

// Common disposable email domains to block
export const DISPOSABLE_EMAIL_DOMAINS = [
    'tempmail.com',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
    'temp-mail.org',
    'getnada.com',
    'trashmail.com',
    'fakeinbox.com',
    'yopmail.com',
    'maildrop.cc',
    'sharklasers.com',
    'guerrillamailblock.com',
    'dispostable.com',
    'emailondeck.com'
];

// Validation length limits
export const VALIDATION_LIMITS = {
    USERNAME_MIN: 3,
    USERNAME_MAX: 20,
    PASSWORD_MIN: 8,
    PASSWORD_MAX: 100,
    NAME_MIN: 2,
    NAME_MAX: 50
};

// Regular expressions for validation
export const VALIDATION_REGEX = {
    // Username: letters, numbers, and underscores only
    USERNAME: /^[a-zA-Z0-9_]+$/,

    // Password requirements (used individually)
    PASSWORD_LOWERCASE: /[a-z]/,
    PASSWORD_UPPERCASE: /[A-Z]/,
    PASSWORD_NUMBER: /[0-9]/,
    PASSWORD_SPECIAL: /[^a-zA-Z0-9]/,

    // Name: letters, spaces, hyphens, and apostrophes only
    NAME: /^[a-zA-Z\s'-]+$/,

    // Only numbers (for validation)
    ONLY_NUMBERS: /^\d+$/
};
