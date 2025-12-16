import { Link } from "react-router-dom";
import { CTA_CONTENT } from "@/pages/landingContent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="flex justify-center items-center min-h-[50vh] md:min-h-screen flex-col gap-y-4 max-w-7xl mx-auto text-center whitespace-break-spaces py-8 md:py-16 px-4 sm:px-8 border-t border-gray-200">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {CTA_CONTENT.title}
        </h2>
        <p className="text-sm sm:text-base md:text-lg">
          {CTA_CONTENT.subtitle}
        </p>
      </div>
      <Button size="lg" asChild className="w-full sm:w-auto sm:min-w-32">
        <Link to="/register">
          Register <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default CTA;
