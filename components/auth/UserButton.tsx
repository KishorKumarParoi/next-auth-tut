"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { LogOut } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogOutButton from "./LogOut";

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogOutButton>
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2" />
            LogOut
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
