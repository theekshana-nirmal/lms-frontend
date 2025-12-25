import { apiGet } from "./api";
import { API_ENDPOINTS } from "./apiConfig";

// FETCH ALL COURSES
export const getAllCourses = async () => {
    try {
        const response = await apiGet(API_ENDPOINTS.getAllCourses);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};
