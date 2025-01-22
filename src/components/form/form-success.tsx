import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-800 bg-green-100">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
