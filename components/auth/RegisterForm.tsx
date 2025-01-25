"use client";
import { register } from "@/actions/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(null);
    setSuccess(null);

    // Start a transition to indicate that the form is submitting
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
          setSuccess(null);
        } else {
          setSuccess(data?.success ?? null);
          setError(null);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      showSocialLogin={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="John Doe"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success || undefined} />
            <FormError message={error || undefined} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Create An Account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
