"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const Settings = () => {
  const user = useCurrentUser();
  console.log("user: ", user);

  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-md">
      {/* <p className="p-2">{JSON.stringify(user, null, 2)}</p> */}
      <Button
        type="submit"
        variant={"destructive"}
        size="default"
        className="p-2 cursor-pointer"
        onClick={onClick}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Settings;
