import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Is user not logged in?
    if (!token) {
      navigate("/login");
      return;
    }

    // Get User Details
    fetchUserDetails(token);
  }, []);

  const fetchUserDetails = async (token) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const email = localStorage.getItem("email");
    const USER_DETAILS_URL = `${API_BASE_URL}/api/user/${email}`;

    try {
      const data = await apiGet(USER_DETAILS_URL);
      console.log("User details fetched:", data.data);
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while fetching user details
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col mt-20 items-center justify-center">
        Loading...
      </div>
    );
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Navbar />
      <main className="flex max-h-fit gap-8 grow container mx-auto px-4 py-8 items-center bg-accent rounded-2xl">
        {/* Profile Photo */}
        <div className="flex justify-center">
          {user && user.profilePhotoUrl ? (
            <img
              src={user.profilePhotoUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <p>No profile photo available.</p>
          )}
        </div>
        {/* Profile Info */}
        <div className="flex flex-col max-h-fit ">
          <h1 className="text-3xl font-bold">{user.role == "STUDENT" ? "Student " : "Teacher "}Dashboard</h1>
          {user ? (
            <div>
              <p>Welcome, {user.firstName + " " + user.lastName}!</p>
            </div>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
