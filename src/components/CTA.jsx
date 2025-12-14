import { Link } from "react-router-dom";
import { CTA_CONTENT } from "@/constants/data";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-y-4 max-w-7xl mx-auto text-center whitespace-break-spaces py-16 border-t border-gray-200">
      <div className="flex flex-col gap-y-4">
        <h2>{CTA_CONTENT.title}</h2>
        <p>{CTA_CONTENT.subtitle}</p>
      </div>
      <Button size="lg" asChild className="max-w-32">
        <Link to="/register">
          Register <ArrowRight />
        </Link>
      </Button>
    </div>
  );
};

export default CTA;
