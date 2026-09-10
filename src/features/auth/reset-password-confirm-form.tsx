"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { PasswordField } from "@/shared/ui/password-field";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";
import { useAuth } from "./auth-provider";
import {
  type ConfirmPasswordResetFormData,
  confirmPasswordResetSchema,
} from "./validators";

interface ResetPasswordConfirmFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  token: string;
}

export function ResetPasswordConfirmForm({
  token,
  className,
  ...props
}: ResetPasswordConfirmFormProps) {
  const { useConfirmPasswordReset } = useAuth();
  const confirmReset = useConfirmPasswordReset();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmPasswordResetFormData>({
    resolver: zodResolver(confirmPasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ConfirmPasswordResetFormData) => {
    confirmReset.mutate(
      { token, new_password: data.password },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("Password reset successfully!");
        },
        onError: (err) => {
          setError("password", { message: err.message });
          toast.error(err.message || "Failed to update password");
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
            Create New Password
          </TypographyH2>
          <TypographyP className="text-xs text-muted-foreground">
            Please enter and confirm your new account password.
          </TypographyP>
        </div>

        {isSuccess ? (
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-xs text-primary space-y-3">
            <p className="font-semibold">
              Your password has been reset successfully.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Continue to Sign In</Link>
            </Button>
          </div>
        ) : (
          <>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <PasswordField
                id="password"
                placeholder="••••••••"
                disabled={confirmReset.isPending}
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm New Password
              </FieldLabel>
              <PasswordField
                id="confirmPassword"
                placeholder="••••••••"
                disabled={confirmReset.isPending}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>

            <Button
              type="submit"
              className="w-full"
              disabled={confirmReset.isPending}
            >
              {confirmReset.isPending
                ? "Updating password..."
                : "Confirm Reset"}
            </Button>
          </>
        )}
      </FieldGroup>
    </form>
  );
}
