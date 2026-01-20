import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {Button} from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    Field, FieldDescription, FieldGroup, FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {authService} from "@/services/authService.js";
import {getErrorMessage} from "@/utils/errorHandler.js";
import {toast} from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "", password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Call login service
            await authService.login(formData);

            // Redirect to dashboard
            navigate("/dashboard", {replace: true});
        } catch (error) {
            const errorMessage = getErrorMessage(error, 'login');
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (<>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 pt-20">
            <Card className="w-full max-w-md shadow-lg border-border/40">
                <CardHeader className="text-center">
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        to="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/register" className="underline">
                                        Sign up
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
        <Footer/>
    </>);
};

export default Login;
