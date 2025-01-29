interface VerifyEmailPageProps {
  slug: string;
}

const VerifyEmailPage = ({ slug }: VerifyEmailPageProps) => {
  console.log(slug);
  return <div>VerifyEmailPage: {slug}</div>;
};

export default VerifyEmailPage;
