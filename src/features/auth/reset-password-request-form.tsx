"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";
import { useAuth } from "./auth-provider";
import {
  type RequestPasswordResetFormData,
  requestPasswordResetSchema,
} from "./validators";

export function ResetPasswordRequestForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { useRequestPasswordReset } = useAuth();
  const requestReset = useRequestPasswordReset();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RequestPasswordResetFormData>({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: RequestPasswordResetFormData) => {
    setSuccessMessage(null);
    requestReset.mutate(
      { email: data.email },
      {
        onSuccess: (res) => {
          setSuccessMessage(res.message);
          toast.success("Reset link sent");
        },
        onError: (err) => {
          setError("email", { message: err.message });
          toast.error(err.message || "Failed to send reset link");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <TypographyH2 className="text-2xl font-bold tracking-tight">
            Reset Password
          </TypographyH2>
          <TypographyP className="text-xs text-muted-foreground">
            Enter your email to receive recovery instructions.
          </TypographyP>
        </div>

        {successMessage ? (
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-xs text-primary space-y-2">
            <p className="font-semibold">{successMessage}</p>
            <p className="text-muted-foreground">
              Please check your inbox. If you don&apos;t receive an email within
              a few minutes, check your spam folder.
            </p>
          </div>
        ) : (
          <>
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                disabled={requestReset.isPending}
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Button
              type="submit"
              className="w-full"
              disabled={requestReset.isPending}
            >
              {requestReset.isPending ? "Sending link..." : "Send Reset Link"}
            </Button>
          </>
        )}

        <div className="text-center text-xs">
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            Back to Sign In
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}
