import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProfileSection from "@/components/dashboard/ProfileSection";
import CourseList from "@/components/dashboard/CourseList";
import { useDashboard } from "@/hooks/useDashboard";

const Dashboard = () => {
    const { user, courses, isLoading, refetchCourses } = useDashboard();

    // Show loading state while fetching data
    if (isLoading) {
        return <LoadingSpinner message="Loading your dashboard..." />;
    }

    return (
        <div className="min-h-screen flex flex-col mt-20">
            <Navbar />
            <ProfileSection user={user} />
            <CourseList
                courses={courses}
                userRole={user?.role}
                currentUserId={user?.id}
                onCoursesRefetch={refetchCourses}
            />
            <Footer />
        </div>
    );
};

export default Dashboard;
