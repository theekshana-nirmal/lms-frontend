export const getErrorMessage = (error, context = 'general') => {
    const errorMessages = {
        login: {
            default: 'Login failed. Please check your credentials.',
            network: 'Network error. Please check your connection.',
        },
        registration: {
            default: 'Registration failed. Please try again.',
            conflict: 'An account with this email already exists.',
        },
        general: {
            default: 'An unexpected error occurred.',
        }
    };
    if (error.message?.includes('fetch')) {
        return errorMessages[context]?.network || 'Network error occurred.';
    }

    if (error.message?.includes('already exists')) {
        return errorMessages.registration.conflict;
    }
    return error.message || errorMessages[context]?.default || errorMessages.general.default;
};