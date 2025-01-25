"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log("Google login clicked")}
      >
        <FcGoogle className="w-6 h-6" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => console.log("Github login clicked")}
      >
        <FaGithub className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Social;
