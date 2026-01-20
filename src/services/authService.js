import {apiPost} from './api';
import {API_ENDPOINTS} from './apiConfig';
import {saveAuthData} from '@/utils/storage';

export const authService = {
    // LOGIN USER
    async login(credentials) {
        const response = await apiPost(API_ENDPOINTS.login, credentials, false);
        saveAuthData(response.accessToken, response.email, response.role);
        return response;
    },

    // REGISTER USER
    async register(userData) {
        const response = await apiPost(API_ENDPOINTS.register, userData, false);
        saveAuthData(response.accessToken, response.email, response.role);
        return response;
    },
};