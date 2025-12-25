import CourseCard from "./CourseCard";
import { USER_ROLES } from "@/constants/roles";

// Component to display a list of courses in a grid layout
const CourseList = ({ courses, userRole }) => {
    const getHeadingText = () => {
        if (userRole === USER_ROLES.TEACHER) {
            return "My Created Courses";
        }
        return "All Courses";
    };

    return (
        <div className="container mx-auto px-4 py-8 grow">
            <h2 className="text-2xl font-semibold mb-4">{getHeadingText()}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default CourseList;
