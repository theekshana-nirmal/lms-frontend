import { apiGet, apiPost, apiPut, apiDelete } from "./api";
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

// CREATE NEW COURSE
export const createCourse = async (courseData) => {
    try {
        const response = await apiPost(API_ENDPOINTS.createCourse, courseData);
        return response.data;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
};

// UPDATE COURSE
export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await apiPut(API_ENDPOINTS.updateCourse(courseId), courseData);
        return response.data;
    } catch (error) {
        console.error("Error updating course:", error);
        throw error;
    }
};

// DELETE COURSE
export const deleteCourse = async (courseId) => {
    try {
        const response = await apiDelete(API_ENDPOINTS.deleteCourse(courseId));
        return response.data;
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
};
