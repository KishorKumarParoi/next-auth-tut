"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const onClick = () => {
    startTransition(() => {
      settings({ name: "Kishor Kumar Paroi" })
        .then(() => {
          update();
        })
        .then(() => {
          toast.success("Settings Updated!");
        })
        .catch(() => {
          toast.error("An error occurred while updating settings");
        });
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🎮 Settings</p>
      </CardHeader>
      <Button
        disabled={isPending}
        variant={"destructive"}
        className="text-center mx-auto flex justify-center items-center"
        onClick={onClick}
      >
        Update Name
      </Button>
    </Card>
  );
};

export default Settings;
