"use client";
import { reset } from "@/actions/reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";

const ResetForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError(null);
    setSuccess(null);

    console.log("values", values);
    // Start a transition to indicate that the form is submitting
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error ?? null);
        setSuccess(data?.success ?? null);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your Password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocialLogin={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
            <FormSuccess message={success || undefined} />
            <FormError message={error || undefined} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Send Reset Email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
