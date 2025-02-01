"use client";
import { login } from "@/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const calbackUrl = searchParams.get("callbackUrl") || "";

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(null);
    setSuccess(null);

    // Start a transition to indicate that the form is submitting
    startTransition(() => {
      login(values, calbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((error) => {
          console.error("Error on form submission using 2FA", error);
          // TODO: Handle error on form submission
          // setError("Something went wrong on form submission");
          return null;
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back, Login"
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/auth/register"
      showSocialLogin={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value || ""}
                        className="block w-full"
                        placeholder="123456"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@gmail.com"
                          {...field}
                          disabled={isPending}
                          className="block w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                          disabled={isPending}
                          className="block w-full"
                        />
                      </FormControl>
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormSuccess message={success || undefined} />
            <FormError message={error || urlError} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
