import { useState } from "react";
import CourseCard from "./CourseCard";
import CreateCourseModal from "./CreateCourseModal";
import EditCourseModal from "./EditCourseModal";
import { USER_ROLES } from "@/constants/roles";
import { Button } from "@/components/ui/button";

// Component to display a list of courses in a grid layout
const CourseList = ({ courses, userRole, currentUserId, onCoursesRefetch }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const getHeadingText = () => {
        if (userRole === USER_ROLES.TEACHER) {
            return "My Created Courses";
        }
        return "All Courses";
    };

    // Handle successful course creation or update
    const handleCourseChange = () => {
        if (onCoursesRefetch) {
            onCoursesRefetch();
        }
    };

    // Handle edit button click
    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setIsEditModalOpen(true);
    };

    // Handle edit modal close
    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setSelectedCourse(null);
    };

    return (
        <div className="container mx-auto px-4 py-8 grow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{getHeadingText()}</h2>

                {/* Show Create Course button only for teachers */}
                {userRole === USER_ROLES.TEACHER && (
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        Create New Course
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            userRole={userRole}
                            currentUserId={currentUserId}
                            onCourseDeleted={handleCourseChange}
                            onEditClick={handleEditClick}
                        />
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>

            {/* Create Course Modal */}
            <CreateCourseModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCourseChange}
            />

            {/* Edit Course Modal */}
            <EditCourseModal
                isOpen={isEditModalOpen}
                onClose={handleEditClose}
                onSuccess={handleCourseChange}
                course={selectedCourse}
            />
        </div>
    );
};

export default CourseList;
