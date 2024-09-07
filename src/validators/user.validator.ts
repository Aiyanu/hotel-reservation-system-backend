import { z } from "zod";
import { fileTypes } from "../utils/index.utils";

const updateSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  role: z
    .enum(["GUEST", "HOTEL_OWNER"], {
      errorMap: () => ({ message: "Invalid role" }),
    })
    .optional(),
});

const uploadSchema = z.object({
  file: z
    .object({
      originalname: z.string().min(1, "File must have a name"),
      mimetype: z
        .string()
        .refine(
          (type) => fileTypes.includes(type),
          "Unsupported file type. Only JPEG or PNG allowed."
        ),
      size: z.number().max(10 * 1024 * 1024, "File size must be less than 5MB"), // Restrict file size to 5MB
    })
    .refine((file) => !!file, "File is required"), // Check if file exists
});

const userSchema = {
  updateSchema,
  uploadSchema,
};
export default userSchema;
