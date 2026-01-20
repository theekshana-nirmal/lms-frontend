import { NAV_LINKS } from "@/constants/landingContent";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { clearAuthData, isAuthenticated, getAuthData } from "@/utils/storage.js";
import { apiGet } from "@/services/api";
import { API_ENDPOINTS } from "@/services/apiConfig";
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (loggedIn) {
        try {
          const authData = getAuthData();
          if (authData.email) {
            const response = await apiGet(API_ENDPOINTS.getUserByEmail(authData.email));
            setUser(response.data);
          }
        } catch (error) {
          console.error("Error fetching user data for navbar:", error);
        }
      }
    };

    fetchUserData();
  }, [loggedIn]);

  const handleLogout = () => {
    clearAuthData();
    setLoggedIn(false);
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="max-w-full px-2 sm:px-8 lg:px-16 py-4 flex items-center justify-between border-b border-gray-200 fixed top-0 bg-white w-full z-10">
      <div className="font-bold text-xl text-gray-800">
        <Link to="/#hero">LMS</Link>
      </div>

      <div className="hidden md:flex gap-4 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="hover:text-gray-600 transition-colors cursor-pointer"
            replace
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-4 items-center">
        {loggedIn ? (
          <>
            {/* Profile Picture */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition-colors cursor-pointer"
              title="Go to Dashboard"
            >
              {user?.profilePhotoUrl ? (
                <img
                  src={user.profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </button>

            {/* Logout Button */}
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
