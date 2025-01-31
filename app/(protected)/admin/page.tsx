"use client";
import { admin } from "@/actions/admin";
import Rolegate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = async () => {
    admin().then((response) => {
      if (response.success) {
        toast.success("Allowed Server Action ✅");
        console.log("Allowed Server Action ✅");
      } else {
        toast.error("Forbidden Server Action ❌");
        console.log("Forbidden Server Action ❌");
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Api Route ✅");
        console.log("Allowed Api Route ✅");
      } else {
        toast.error("Forbidden Api Route ❌");
        console.log("Forbidden Api Route ❌");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Rolegate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content! 🎉" />
        </Rolegate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md space-x-2">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md space-x-2">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
