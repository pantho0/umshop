import z from "zod";

const passwordValidation = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters long.",
  })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  );

export const createUserValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name cannot be empty." })
    .nonempty({ message: "First name is required." }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name cannot be empty." })
    .nonempty({ message: "Last name is required." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),
  password: passwordValidation,
  role: z.enum(["admin", "user"]).default("user"),
  isBlocked: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});
