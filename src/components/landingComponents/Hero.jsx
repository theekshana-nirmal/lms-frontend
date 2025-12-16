import { HERO_CONTENT } from "@/data/landingContent";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div id="hero" className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-4rem)] text-center whitespace-break-spaces gap-y-8 px-4 sm:px-8 pt-32">
      <div className="flex flex-col gap-y-4 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {HERO_CONTENT.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl">
          {HERO_CONTENT.subtitle}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <Button
          size="lg"
          variant="outline"
          asChild
          className="w-full sm:w-auto"
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button size="lg" asChild className="w-full sm:w-auto">
          <Link to="/register">
            Register <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
