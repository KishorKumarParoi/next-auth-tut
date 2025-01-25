import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Settings = async () => {
  const session = await auth();
  console.log("Session: ", session);
  return (
    <div>
      <p className="p-2">{JSON.stringify(session, null, 2)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          type="submit"
          variant={"destructive"}
          size="default"
          className="p-2 cursor-pointer"
        >
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default Settings;
