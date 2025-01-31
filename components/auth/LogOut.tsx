"use client";

import { logout } from "@/actions/logout";

interface LogOutProps {
  children: React.ReactNode;
}

const LogOutButton = ({ children }: LogOutProps) => {
  const onClick = () => {
    console.log("LogOut");
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogOutButton;
