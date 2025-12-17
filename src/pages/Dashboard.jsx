import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { apiGet } from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/services/apiConfig.js";
import LoadingSpinner from "@/components/common/LoadingSpinner.jsx";
import { clearAuthData, getAuthData, isAuthenticated } from "@/utils/storage.js";
import { getRoleDisplayName } from "@/constants/roles.js";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchUserDetails = useCallback(async (email) => {
        try {
            const response = await apiGet(API_ENDPOINTS.getUserByEmail(email));
            setUser(response.data);
        } catch (error) {
            clearAuthData();
            console.error("Error fetching user details:", error);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
            return;
        }

        // Get User Details
        const authData = getAuthData();
        fetchUserDetails(authData.email);
    }, [navigate, fetchUserDetails]);



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
            <Footer />
        </div>
    );
};

export default Dashboard;
