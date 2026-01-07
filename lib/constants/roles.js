/**
 * User role constants
 * Used for Clerk publicMetadata role field
 */

export const USER_ROLES = {
    SELLER: 'seller',
    CUSTOMER: 'customer',
    ADMIN: 'admin'
};

// Helper function to check if a role is valid
export function isValidRole(role) {
    return Object.values(USER_ROLES).includes(role);
}

// Helper function to check if user has a specific role
export function hasRole(user, role) {
    return user?.publicMetadata?.role === role;
}
