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
import { type RegisterFormData, registerSchema } from "./validators";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { useRegisterWithEmail, useLoginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const registerWithEmail = useRegisterWithEmail();
  const loginWithGoogle = useLoginWithGoogle();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "admin",
      termsAccepted: true,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerWithEmail.mutate(
      {
        name: data.name,
        email: data.email,
        pass: data.password,
        userType: data.userType,
      },
      {
        onSuccess: (_user) => {
          toast.success("Account created successfully!");
          const target = getSafeRedirectPath(next, data.userType, "/dashboard");
          router.push(target);
        },
        onError: (err) => {
          setError("root", { message: err.message || "Registration failed" });
          toast.error(err.message || "Registration failed");
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
          toast.error(err.message || "Google registration failed");
        },
      },
    );
  };

  const isLoading =
    registerWithEmail.isPending || loginWithGoogle.isPending || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <TypographyH2 className="text-2xl font-bold tracking-tight">
            Create Ghosted Workspace
          </TypographyH2>
          <TypographyP className="text-xs text-muted-foreground">
            Start building with high-throughput autonomous agents.
          </TypographyP>
        </div>

        {errors.root && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
            {errors.root.message}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            placeholder="Jane Doe"
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordField
            id="password"
            placeholder="Minimum 8 characters"
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <PasswordField
            id="confirmPassword"
            placeholder="Re-enter password"
            disabled={isLoading}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={watch("termsAccepted")}
            onCheckedChange={(checked) =>
              setValue("termsAccepted", Boolean(checked))
            }
          />
          <label htmlFor="terms" className="text-xs text-muted-foreground">
            I agree to the Terms of Service and Privacy Policy
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-xs text-destructive">
            {errors.termsAccepted.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
