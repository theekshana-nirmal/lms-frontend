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

// FETCH COURSES BY TEACHER ID
export const getCoursesByTeacher = async (teacherId) => {
    try {
        const response = await apiGet(API_ENDPOINTS.getCoursesByTeacher(teacherId));
        return response.data;
    } catch (error) {
        console.error("Error fetching teacher courses:", error);
        throw error;
    }
};
