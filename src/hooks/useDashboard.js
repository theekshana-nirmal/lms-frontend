import { useState, useEffect, useCallback } from "react";
import { getUserByEmail } from "@/services/userService";
import { getAllCourses } from "@/services/courseService";
import { getAuthData } from "@/utils/storage";

/**
 * Custom hook for managing dashboard data and state
 * @returns {Object} Dashboard state and data
 */
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
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError(error);
        }
    }, []);

    // Fetch all courses
    const fetchCourses = useCallback(async () => {
        try {
            const coursesData = await getAllCourses();
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

            await Promise.all([
                fetchUserDetails(authData.email),
                fetchCourses()
            ]);

            setLoading(false);
        };

        void loadDashboardData();
    }, [fetchUserDetails, fetchCourses]);

    return {
        user,
        courses,
        isLoading,
        error,
        refetchUser: fetchUserDetails,
        refetchCourses: fetchCourses
    };
};
