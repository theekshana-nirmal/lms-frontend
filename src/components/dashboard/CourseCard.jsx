import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * CourseCard component displays individual course information
 * @param {Object} props
 * @param {Object} props.course - Course object with details
 * @returns {JSX.Element}
 */
const CourseCard = ({ course }) => {
    return (
        <Card className="px-4 overflow-hidden hover:shadow-lg transition-shadow w-full shadow-lg border-border/40">
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
                        <p className="text-sm">
                            {`${course.createdBy.firstName} ${course.createdBy.lastName}`}
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Created: {course.createdDate}
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-0">
                <Link to={`/course/${course.id}`} className="w-full">
                    <button className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md">
                        View Course
                    </button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default CourseCard;
