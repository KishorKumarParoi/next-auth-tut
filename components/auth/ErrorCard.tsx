import { FaExclamation } from "react-icons/fa";
import CardWrapper from "./CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocialLogin={false}
    >
      <div className="w-full flex items-center justify-center">
        <FaExclamation className="w-6 h-6 text-red-500" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
