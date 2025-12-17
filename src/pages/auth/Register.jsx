import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    Field, FieldDescription, FieldGroup, FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/authService.js";
import { getErrorMessage } from "@/utils/errorHandler.js";
import { toast } from "sonner";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", role: "", password: "", confirmPassword: "",
    });

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }
        if (!formData.role) {
            toast.error("Please select a role (Student or Teacher).");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await authService.register(formData);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            const errorMessage = getErrorMessage(error, 'registration');
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (<>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center py-12 px-4 pt-20 mt-4">
            <Card className="w-full max-w-md shadow-lg border-border/40">
                <CardHeader className="text-center">
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        required
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel>How will you use this platform?</FieldLabel>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="STUDENT"
                                            checked={formData.role === "STUDENT"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-4 h-4 text-primary cursor-pointer"
                                        />
                                        <span className="text-sm">Student</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="TEACHER"
                                            checked={formData.role === "TEACHER"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-4 h-4 text-primary cursor-pointer"
                                        />
                                        <span className="text-sm">Teacher</span>
                                    </label>
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({
                                        ...formData, confirmPassword: e.target.value,
                                    })}
                                    required
                                />
                            </Field>

                            <Field>
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? "Creating account..." : "Create account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline">
                                        Login
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
        <Footer />
    </>);
};

export default Register;
