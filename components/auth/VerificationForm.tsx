"use client";

import { EmailVerification } from "@/actions/email-verify-token";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import CardWrapper from "./CardWrapper";

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    console.log("submitting verification token", token);

    if (!token) {
      setError("Missing token");
      return;
    }

    EmailVerification(token)
      .then((res) => {
        setSuccess(res?.success);
        setError(res?.error);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to verify email");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }
  }, [token, onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocialLogin={false}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#000" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default VerificationForm;
