import CourseCard from "./CourseCard";

/**
 * CourseList component displays a grid of courses
 * @param {Object} props
 * @param {Array} props.courses - Array of course objects
 * @returns {JSX.Element}
 */
const CourseList = ({ courses }) => {
    return (
        <div className="container mx-auto px-4 py-8 grow">
            <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
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
