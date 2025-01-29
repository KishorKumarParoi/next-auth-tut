import VerificationForm from "@/components/auth/VerificationForm";

interface VerifyEmailPageProps {
  slug: string;
}

const VerifyEmailPage = ({ slug }: VerifyEmailPageProps) => {
  console.log(slug);
  return <VerificationForm />;
};

export default VerifyEmailPage;
