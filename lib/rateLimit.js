// Simple in-memory rate limiting
// For production with multiple instances, consider using Redis

const rateLimitStore = new Map();

// Configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5; // Maximum attempts per window

// Cleanup old entries every 30 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 30 * 60 * 1000;

// Cleanup function
const cleanup = () => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
        if (now > record.resetAt) {
            rateLimitStore.delete(key);
        }
    }
};

// Start cleanup interval
if (typeof setInterval !== 'undefined') {
    setInterval(cleanup, CLEANUP_INTERVAL_MS);
}

/**
 * Check if a user/action combination is within rate limits
 * @param {string} userId - The user ID to check
 * @param {string} action - The action being performed (e.g., 'seller-onboard')
 * @returns {{ allowed: boolean, retryAfter?: number }} - Rate limit status
 */
export function checkRateLimit(userId, action) {
    const key = `${userId}:${action}`;
    const now = Date.now();
    const record = rateLimitStore.get(key);

    // If record exists and window hasn't expired
    if (record && now < record.resetAt) {
        if (record.count >= MAX_ATTEMPTS) {
            // Rate limit exceeded
            return {
                allowed: false,
                retryAfter: record.resetAt - now
            };
        }

        // Increment count
        record.count++;
        rateLimitStore.set(key, record);
        return { allowed: true };
    }

    // Create new record (window expired or doesn't exist)
    rateLimitStore.set(key, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS
    });

    return { allowed: true };
}

/**
 * Reset rate limit for a specific user/action
 * Useful for testing or admin override
 */
export function resetRateLimit(userId, action) {
    const key = `${userId}:${action}`;
    rateLimitStore.delete(key);
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(userId, action) {
    const key = `${userId}:${action}`;
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now >= record.resetAt) {
        return {
            remaining: MAX_ATTEMPTS,
            resetAt: null
        };
    }

    return {
        remaining: Math.max(0, MAX_ATTEMPTS - record.count),
        resetAt: record.resetAt
    };
}
