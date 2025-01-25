import LoginForm from "@/components/auth/LoginForm";
import { auth } from "../../../../auth";

const LoginPage = async () => {
  const session = await auth();
  console.log("Session: ", session);
  return (
    <div>
      <LoginForm />
      <pre className="bg-red-400 text-center">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
};

export default LoginPage;
