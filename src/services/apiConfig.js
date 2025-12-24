const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_ENDPOINTS = {
    // Auth endpoints
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh-token`,

    // User endpoints
    getUserByEmail: (email) => `${API_BASE_URL}/api/user/${email}`,

    // Course endpoints
    getAllCourses: `${API_BASE_URL}/api/courses`,
    getCourseById: (id) => `${API_BASE_URL}/api/courses/${id}`,
};