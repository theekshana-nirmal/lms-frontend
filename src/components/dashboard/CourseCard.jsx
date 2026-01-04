import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/services/courseService";
import { toast } from "sonner";
import { USER_ROLES } from "@/constants/roles";

// CourseCard component to display individual course details
const CourseCard = ({ course, userRole, currentUserId, onCourseDeleted, onEditClick }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    // Check if current user is the course creator
    const isOwner = course.createdBy?.id === currentUserId;
    const showActions = userRole === USER_ROLES.TEACHER && isOwner;

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteCourse(course.id);
            toast.success("Course deleted successfully!");
            if (onCourseDeleted) {
                onCourseDeleted();
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error(error.message || "Failed to delete course");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className="px-4 overflow-hidden hover:shadow-lg transition-shadow w-full shadow-lg border-border/40">
            {/* Course Cover Image */}
            <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
                <img
                    src={course.coverImageUrl}
                    alt={course.courseName}
                    className="w-full h-full object-cover"
                />
                {/* Action buttons overlay on image */}
                {showActions && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0"
                            onClick={() => onEditClick(course)}
                            disabled={isDeleting}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
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
