import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .refine((email) => email.endsWith("apc.edu.ph"), {
      message: "Email must end with @apc.edu.ph",
    }),
  password: z
    .string(),
  remember: z.boolean().optional(),
});

export type FormSchemas = z.infer<typeof LoginSchema>;
