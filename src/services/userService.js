import { apiGet } from "./api";
import { API_ENDPOINTS } from "./apiConfig";

/**
 * Service for user-related API operations
 */

/**
 * Fetch user details by email
 * @param {string} email - User email address
 * @returns {Promise<Object>} User data
 */
export const getUserByEmail = async (email) => {
    try {
        const response = await apiGet(API_ENDPOINTS.getUserByEmail(email));
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};
