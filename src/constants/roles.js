export const USER_ROLES = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
};

export const getRoleDisplayName = (role) => {
    const displayNames = {
        [USER_ROLES.STUDENT]: 'Student',
        [USER_ROLES.TEACHER]: 'Teacher',
    };
    return displayNames[role] || 'User';
};