import { HERO_CONTENT } from "@/constants/data";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-5rem)] text-center whitespace-break-spaces gap-y-8">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-7xl font-bold">{HERO_CONTENT.title}</h1>
        <p className="text-xl">{HERO_CONTENT.subtitle}</p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button size="lg" asChild>
          <Link to="/register">
            Register <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
