import { apiGet } from "./api";
import { API_ENDPOINTS } from "./apiConfig";

// FETCH USER DETAILS BY EMAIL
export const getUserByEmail = async (email) => {
    try {
        const response = await apiGet(API_ENDPOINTS.getUserByEmail(email));
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};
