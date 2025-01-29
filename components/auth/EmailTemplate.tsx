import Link from "next/link";
import * as React from "react";

interface EmailTemplateProps {
  confirmLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmLink,
}) => (
  <div>
    <Link href={confirmLink}>Click here to confirm your email</Link>
  </div>
);
