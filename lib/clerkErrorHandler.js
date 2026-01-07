/**
 * Centralized Clerk error handler
 * Maps Clerk API error codes to user-friendly messages and HTTP status codes
 */

const CLERK_ERROR_MAP = {
    // Form identifier errors
    'form_identifier_exists': {
        message: 'Username or email already exists. Please use a different one.',
        status: 409
    },

    // Password errors
    'form_password_pwned': {
        message: 'This password has been exposed in a data breach. Please choose a different password for your security.',
        status: 400
    },
    'form_password_length_too_short': {
        message: 'Password does not meet minimum length requirements.',
        status: 400
    },
    'form_password_no_uppercase': {
        message: 'Password must contain at least one uppercase letter.',
        status: 400
    },
    'form_password_no_lowercase': {
        message: 'Password must contain at least one lowercase letter.',
        status: 400
    },
    'form_password_no_number': {
        message: 'Password must contain at least one number.',
        status: 400
    },

    // Username errors
    'form_username_invalid': {
        message: 'Username format is invalid. Please use only letters, numbers, and underscores.',
        status: 400
    },
    'form_username_length_too_short': {
        message: 'Username is too short. Please use at least 3 characters.',
        status: 400
    },
    'form_username_length_too_long': {
        message: 'Username is too long. Please use no more than 20 characters.',
        status: 400
    },

    // Email errors
    'form_identifier_not_found': {
        message: 'Email address not found.',
        status: 404
    },
    'form_param_format_invalid': {
        message: 'Invalid data format provided. Please check your input.',
        status: 400
    },

    // Rate limiting
    'rate_limit_exceeded': {
        message: 'Too many requests. Please try again later.',
        status: 429
    },

    // Authorization errors
    'authorization_invalid': {
        message: 'Invalid authorization. Please sign in again.',
        status: 401
    },
    'session_exists': {
        message: 'An active session already exists.',
        status: 409
    },

    // Resource errors
    'resource_not_found': {
        message: 'The requested resource was not found.',
        status: 404
    },

    // Validation errors
    'form_param_nil': {
        message: 'Required field is missing.',
        status: 400
    },
    'form_param_value_invalid': {
        message: 'Invalid value provided.',
        status: 400
    }
};

/**
 * Handle Clerk API errors and return appropriate response
 * @param {Error} error - The error from Clerk API
 * @returns {{ message: string, status: number }} - User-friendly message and HTTP status
 */
export function handleClerkError(error) {
    // Check if it's a Clerk error with error codes
    if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        const errorCode = error.errors[0].code;

        if (CLERK_ERROR_MAP[errorCode]) {
            return CLERK_ERROR_MAP[errorCode];
        }

        // If error code not in map but has a message, use it
        if (error.errors[0].message) {
            return {
                message: error.errors[0].message,
                status: 400
            };
        }
    }

    // Default fallback for unknown errors
    return {
        message: 'An unexpected error occurred. Please try again later.',
        status: 500
    };
}

/**
 * Check if an error is a specific Clerk error code
 * @param {Error} error - The error to check
 * @param {string} code - The Clerk error code to match
 * @returns {boolean} - True if error matches the code
 */
export function isClerkError(error, code) {
    return error.errors &&
           Array.isArray(error.errors) &&
           error.errors.length > 0 &&
           error.errors[0].code === code;
}

/**
 * Get all error codes from a Clerk error
 * @param {Error} error - The error from Clerk
 * @returns {string[]} - Array of error codes
 */
export function getClerkErrorCodes(error) {
    if (error.errors && Array.isArray(error.errors)) {
        return error.errors.map(err => err.code).filter(Boolean);
    }
    return [];
}
