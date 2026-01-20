import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/services/courseService";
import { getErrorMessage } from "@/utils/errorHandler";
import { toast } from "sonner";

/**
 * Modal component for creating a new course
 * Displays a form for teachers to create courses
 */
const CreateCourseModal = ({ isOpen, onClose, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        coverImageUrl: "",
    });

    // Reset form data
    const resetForm = () => {
        setFormData({
            courseName: "",
            description: "",
            coverImageUrl: "",
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await createCourse(formData);
            toast.success("Course created successfully!");
            resetForm();
            onClose();

            // Trigger course list refresh
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error, "create course");
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle cancel - close modal and reset form
    const handleCancel = () => {
        resetForm();
        onClose();
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Don't render if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-lg shadow-lg border-border/40 mx-4">
                <CardHeader>
                    <CardTitle>Create New Course</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new course
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            {/* Course Name Field */}
                            <Field>
                                <FieldLabel htmlFor="courseName">
                                    Course Name *
                                </FieldLabel>
                                <Input
                                    id="courseName"
                                    type="text"
                                    placeholder="e.g., Introduction to React"
                                    value={formData.courseName}
                                    onChange={(e) =>
                                        handleInputChange("courseName", e.target.value)
                                    }
                                    required
                                    disabled={isLoading}
                                />
                            </Field>

                            {/* Description Field */}
                            <Field>
                                <FieldLabel htmlFor="description">
                                    Description *
                                </FieldLabel>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Brief description of the course"
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleInputChange("description", e.target.value)
                                    }
                                    required
                                    disabled={isLoading}
                                />
                            </Field>

                            {/* Cover Image URL Field */}
                            <Field>
                                <FieldLabel htmlFor="coverImageUrl">
                                    Cover Image URL *
                                </FieldLabel>
                                <Input
                                    id="coverImageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.coverImageUrl}
                                    onChange={(e) =>
                                        handleInputChange("coverImageUrl", e.target.value)
                                    }
                                    required
                                    disabled={isLoading}
                                />
                            </Field>

                            {/* Action Buttons */}
                            <div className="flex gap-3 justify-end pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Creating..." : "Create Course"}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateCourseModal;
