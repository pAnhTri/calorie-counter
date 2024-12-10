import { z } from "zod";

export const userSchema = z.object({
  name: z.object({
    firstName: z.string().min(3, "First name must be longer than 3 characters"),
    lastName: z.string().min(3, "Last name must be longer than 3 characters"),
  }),
  dob: z
    .string()
    .min(1, "Date of Birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be of YYYY-MM-DD format"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  height: z
    .string()
    .refine(
      (value: string) =>
        /^\d{1,3}$/.test(value) || /^(\d)'(\d{2})"$/.test(value),
      "Height must be a three-digit number (cm) or in f'in\" format (imperial)"
    )
    .refine((value: string) => {
      if (/^\d{1,3}$/.test(value)) {
        const cm = parseInt(value, 10);
        return cm > 0 && cm <= 302;
      }
      return true; // Skip this check for imperial format
    }, "Metric height must be a positive number and not exceed 302 cm")
    .refine((value: string) => {
      if (/^(\d)'(\d{2})"$/.test(value)) {
        const matches = value.match(/^(\d)'(\d{2})"$/);
        const feet = parseInt(matches![1], 10);
        const inches = parseInt(matches![2], 10);
        return feet <= 9 && inches <= 11;
      }
      return true; // Skip this check for metric format
    }, "Imperial height must not exceed 9'11\""),
  weight: z.number().min(1, "Weight is required"),
});

export type UserSchemaType = z.infer<typeof userSchema>;
