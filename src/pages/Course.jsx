import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {apiGet} from "@/services/api";
import {API_ENDPOINTS} from "@/services/apiConfig";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Calendar, User} from "lucide-react";

const Course = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiGet(API_ENDPOINTS.getCourseById(id));
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner message="Loading course details..."/>;
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar/>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
                        <Button onClick={() => navigate("/dashboard")}>
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-1 container mx-auto px-4 py-8 mt-20">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back to Dashboard
                </Button>

                {/* Course Header */}
                <div className="bg-accent rounded-2xl overflow-hidden shadow-lg mb-8">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Course Cover Image */}
                        <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src={course.coverImageUrl}
                                alt={course.courseName}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Course Info */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl font-bold mb-4">{course.courseName}</h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                {course.description}
                            </p>

                            {/* Course Meta */}
                            <div className="space-y-4">
                                {/* Instructor */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={course.createdBy.profilePhotoUrl}
                                            alt={`${course.createdBy.firstName} ${course.createdBy.lastName}`}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">
                                                {course.createdBy.firstName} {course.createdBy.lastName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Instructor
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Created Date */}
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created on</p>
                                        <p className="font-medium">
                                            {new Date(course.createdDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                    <p className="text-muted-foreground">
                        Course materials and content will be displayed here.
                    </p>
                    {/* TODO: Add course modules, lessons, assignments, etc. */}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default Course;
