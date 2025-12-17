import { NAV_LINKS } from "@/constants/landingContent";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuthData, isAuthenticated } from "@/utils/storage.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

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

      <div className="flex gap-2 sm:gap-4">
        {loggedIn ? (
          <Button variant="outline" onClick={() => {
            clearAuthData();
            setLoggedIn(false);
            navigate("/login", { replace: true });
          }}>Logout</Button>
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
