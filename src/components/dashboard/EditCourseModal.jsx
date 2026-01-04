import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateCourse } from "@/services/courseService";
import { toast } from "sonner";

const EditCourseModal = ({ isOpen, onClose, onSuccess, course }) => {
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        coverImageUrl: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form with course data when modal opens
    useEffect(() => {
        if (course) {
            setFormData({
                courseName: course.courseName || "",
                description: course.description || "",
                coverImageUrl: course.coverImageUrl || "",
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateCourse(course.id, formData);
            toast.success("Course updated successfully!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error(error.message || "Failed to update course");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 w-full max-w-md relative shadow-xl border">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Course Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Course Name *
                        </label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            name="coverImageUrl"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Course"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditCourseModal;
