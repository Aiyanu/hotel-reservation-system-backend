import { z } from "zod";

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

const userSchema = {
  updateSchema,
};
export default userSchema;
