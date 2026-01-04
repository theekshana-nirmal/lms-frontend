import { useState, useEffect, useCallback } from "react";
import { getUserByEmail } from "@/services/userService";
import { getAllCourses, getCoursesByTeacher } from "@/services/courseService";
import { getAuthData } from "@/utils/storage";
import { USER_ROLES } from "@/constants/roles";

// Custom hook for managing dashboard data and state
export const useDashboard = () => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user details
    const fetchUserDetails = useCallback(async (email) => {
        try {
            const userData = await getUserByEmail(email);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError(error);
            return null;
        }
    }, []);

    // Fetch courses based on user role
    const fetchCourses = useCallback(async (userData) => {
        try {
            let coursesData;

            // If teacher, fetch only their courses
            if (userData?.role === USER_ROLES.TEACHER) {
                coursesData = await getCoursesByTeacher(userData.id);
            } else {
                // For students and other roles, fetch all courses
                coursesData = await getAllCourses();
            }

            setCourses(coursesData);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError(error);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            const authData = getAuthData();

            // Fetch user details first, then fetch courses based on user role
            const userData = await fetchUserDetails(authData.email);
            if (userData) {
                await fetchCourses(userData);
            }

            setLoading(false);
        };

        void loadDashboardData();
    }, [fetchUserDetails, fetchCourses]);

    // Refetch courses for the current user
    const refetchCourses = useCallback(() => {
        if (user) {
            return fetchCourses(user);
        }
    }, [user, fetchCourses]);

    return {
        user,
        courses,
        isLoading,
        error,
        refetchUser: fetchUserDetails,
        refetchCourses,
    };
};
