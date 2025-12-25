import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProfileSection from "@/components/dashboard/ProfileSection";
import CourseList from "@/components/dashboard/CourseList";
import { useDashboard } from "@/hooks/useDashboard";

/**
 * Dashboard page component - Clean and focused on UI composition
 * Business logic is handled by the useDashboard hook
 * UI components are modular and reusable
 */
const Dashboard = () => {
    const { user, courses, isLoading } = useDashboard();

    // Show loading state while fetching data
    if (isLoading) {
        return <LoadingSpinner message="Loading your dashboard..." />;
    }

    return (
        <div className="min-h-screen flex flex-col mt-20">
            <Navbar />
            <ProfileSection user={user} />
            <CourseList courses={courses} />
            <Footer />
        </div>
    );
};

export default Dashboard;
