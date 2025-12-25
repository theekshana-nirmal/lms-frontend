import { apiGet } from "./api";
import { API_ENDPOINTS } from "./apiConfig";

/**
 * Service for course-related API operations
 */

/**
 * Fetch all available courses
 * @returns {Promise<Array>} Array of course objects
 */
export const getAllCourses = async () => {
    try {
        const response = await apiGet(API_ENDPOINTS.getAllCourses);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};
