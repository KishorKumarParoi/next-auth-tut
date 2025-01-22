import CardWrapper from "./CardWrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back, Login"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="auth/sign-up"
      showSocialLogin={true}
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
