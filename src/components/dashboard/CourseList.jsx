import { useState } from "react";
import CourseCard from "./CourseCard";
import CreateCourseModal from "./CreateCourseModal";
import { USER_ROLES } from "@/constants/roles";
import { Button } from "@/components/ui/button";

// Component to display a list of courses in a grid layout
const CourseList = ({ courses, userRole, onCoursesRefetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getHeadingText = () => {
        if (userRole === USER_ROLES.TEACHER) {
            return "My Created Courses";
        }
        return "All Courses";
    };

    // Handle successful course creation
    const handleCourseCreated = () => {
        if (onCoursesRefetch) {
            onCoursesRefetch();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 grow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{getHeadingText()}</h2>

                {/* Show Create Course button only for teachers */}
                {userRole === USER_ROLES.TEACHER && (
                    <Button onClick={() => setIsModalOpen(true)}>
                        Create New Course
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>

            {/* Create Course Modal */}
            <CreateCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleCourseCreated}
            />
        </div>
    );
};

export default CourseList;
