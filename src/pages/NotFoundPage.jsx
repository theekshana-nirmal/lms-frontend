import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "@/assets/404_not_found.gif";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        loading="lazy"
        className="w-64 max-w-full h-auto rounded-xl"
      />

      <p>The page you are looking for was not found</p>

      <Button asChild variant="outline" size="lg">
        <Link to="/">Go to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
