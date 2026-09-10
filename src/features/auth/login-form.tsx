"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { PasswordField } from "@/shared/ui/password-field";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";
import { useAuth } from "./auth-provider";
import { getSafeRedirectPath } from "./lib/redirect-utils";
import { type LoginFormData, loginSchema } from "./validators";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { useLoginWithEmail, useLoginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const loginWithEmail = useLoginWithEmail();
  const loginWithGoogle = useLoginWithGoogle();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "alex@ghosted.dev",
      password: "password123",
      userType: "admin",
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginWithEmail.mutate(
      {
        email: data.email,
        pass: data.password,
        userType: data.userType,
      },
      {
        onSuccess: (user) => {
          toast.success(`Welcome back, ${user?.name || "Alex"}!`);
          const target = getSafeRedirectPath(next, data.userType, "/dashboard");
          router.push(target);
        },
        onError: (err) => {
          setError("root", { message: err.message || "Failed to sign in" });
          toast.error(err.message || "Invalid credentials");
        },
      },
    );
  };

  const handleGoogleLogin = () => {
    loginWithGoogle.mutate(
      { userType: "admin" },
      {
        onSuccess: () => {
          toast.success("Signed in with Google");
          const target = getSafeRedirectPath(next, "admin", "/dashboard");
          router.push(target);
        },
        onError: (err) => {
          toast.error(err.message || "Google sign in failed");
        },
      },
    );
  };

  const isLoading =
    loginWithEmail.isPending || loginWithGoogle.isPending || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <TypographyH2 className="text-2xl font-bold tracking-tight">
            Sign In to Ghosted
          </TypographyH2>
          <TypographyP className="text-xs text-muted-foreground">
            Access your autonomous services, sub-agents, and telemetry.
          </TypographyP>
        </div>

        {errors.root && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            {errors.root.message}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/login#reset"
              onClick={(e) => {
                e.preventDefault();
                toast.info(
                  "Password reset available in /reset-password route.",
                );
              }}
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordField
            id="password"
            placeholder="••••••••"
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            defaultChecked
            {...register("rememberMe")}
          />
          <label
            htmlFor="rememberMe"
            className="text-xs font-medium text-muted-foreground"
          >
            Remember this session
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In with Email"}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Google Workspace
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-semibold"
          >
            Create account
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
