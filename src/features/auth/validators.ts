import { z } from "zod";

/**
 * Zod validation schema for user login authentication forms.
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

/**
 * Inferred TypeScript form data type for user login.
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Zod validation schema for user account registration forms.
 */
export const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Inferred TypeScript form data type for user registration.
 */
export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Zod validation schema for requesting a password reset email.
 */
export const requestPasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * Inferred TypeScript form data type for password reset request.
 */
export type RequestPasswordResetFormData = z.infer<
  typeof requestPasswordResetSchema
>;

/**
 * Zod validation schema for setting a new password via password reset token.
 */
export const confirmPasswordResetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Inferred TypeScript form data type for confirming a password reset.
 */
export type ConfirmPasswordResetFormData = z.infer<
  typeof confirmPasswordResetSchema
>;
