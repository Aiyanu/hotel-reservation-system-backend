// userValidation.ts
import { z } from "zod";

// User Creation Schema
export const createSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().optional().default("GUEST"),
});

// User Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const logoutSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  code: z.string().min(1, "Reset token is required"),
  password: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});
