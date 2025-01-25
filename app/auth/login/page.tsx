import LoginForm from "components/auth/LoginForm";

const LoginPage = async () => {
  return (
    <div>
      <LoginForm />
      <pre className="bg-red-400 text-center"></pre>
    </div>
  );
};

export default LoginPage;
