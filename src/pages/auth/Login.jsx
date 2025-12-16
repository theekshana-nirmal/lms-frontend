import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { saveAuthData } from "@/utils/storage";
import { apiPost } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Prepare form data
    const formData = { email: email, password: password };

    // Send Data to Backend
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;

    try {
      // Send login request
      const result = await apiPost(API_LOGIN_URL, formData, false);

      // Save auth data to localStorage
      saveAuthData(result.accessToken, result.email, result.role);

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
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
                {/* Display error message if exists */}
                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
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
      <Footer />
    </>
  );
};

export default Login;
