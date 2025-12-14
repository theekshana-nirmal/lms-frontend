import { NAV_LINKS } from "@/constants/data";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="max-w-full px-2 sm:px-8 lg:px-16 py-4 flex items-center justify-between border-b border-gray-200">
      <div className="font-bold text-xl text-gray-800">LMS</div>

      <div className="hidden md:flex gap-4 lg:gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-gray-600 transition-colors cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-4">
        <Button variant="outline" asChild size="sm">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
