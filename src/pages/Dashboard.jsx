import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { apiGet } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/services/apiConfig.js";
import LoadingSpinner from "@/components/common/LoadingSpinner.jsx";
import { getAuthData } from "@/utils/storage.js";
import { getRoleDisplayName } from "@/constants/roles.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} role
 * @property {string} profilePhotoUrl
 */

/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} courseName
 * @property {string} description
 * @property {string} coverImageUrl
 * @property {string} createdDate
 * @property {User} createdBy
 */

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // Fetch User Details
    const fetchUserDetails = useCallback(async (email) => {
        try {
            const response = await apiGet(API_ENDPOINTS.getUserByEmail(email));
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Fetch All Courses
    const fetchCourses = async () => {
        try {
            const response = await apiGet(API_ENDPOINTS.getAllCourses);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        // Get User Details
        const authData = getAuthData();
        void fetchUserDetails(authData.email);
        void fetchCourses();
    }, [fetchUserDetails]);

    // Show loading state while fetching user details
    if (isLoading) {
        return <LoadingSpinner message="Loading your dashboard..." />;
    }

    return (
        <div className="min-h-screen flex flex-col mt-20">
            <Navbar />
            <main className="flex max-h-fit gap-8 grow container mx-auto px-4 py-8 items-center bg-accent rounded-2xl">
                {/* Profile Photo */}
                <div className="flex justify-center">
                    {user && user.profilePhotoUrl ? (
                        <img
                            src={user.profilePhotoUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <p>No profile photo available.</p>
                    )}
                </div>
                {/* Profile Info */}
                <div className="flex flex-col max-h-fit ">
                    <h1 className="text-3xl font-bold">{getRoleDisplayName(user?.role)} Dashboard</h1>
                    {user ? (
                        <div>
                            <p>Welcome, {user.firstName} {user.lastName}!</p>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
            </main>
            {/* Courses Cards List */}
            <div className={"container mx-auto px-4 py-8 grow"}>
                <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Example Course Card */}
                    {courses.length > 0 ? courses.map((course) => (
                        <Card key={course.id}
                            className="px-4 overflow-hidden hover:shadow-lg transition-shadow w-full shadow-lg border-border/40">
                            {/* Course Cover Image */}
                            <div className="w-full h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={course.coverImageUrl}
                                    alt={course.courseName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <CardHeader className="p-0">
                                <CardTitle className="line-clamp-2">{course.courseName}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={course.createdBy.profilePhotoUrl}
                                        alt={`${course.createdBy.firstName} ${course.createdBy.lastName}`}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="text-sm">
                                        <p className="text-sm">{`${course.createdBy.firstName} ${course.createdBy.lastName}`}</p>
                                        <p className="text-muted-foreground text-xs">Created: {course.createdDate}</p>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-0">
                                <Link to={`/course/${course.id}`} className="w-full">
                                    <button
                                        className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md">
                                        View Course
                                    </button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )) : <p>No courses available.</p>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
