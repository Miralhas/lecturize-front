import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Must be a well-formed e-mail address"),
  username: z.string()
    .min(3, {
      message: "Username must be at least 3 characters long"
    })
    .max(20, {
      message: "Username cannot be more than 20 characters long"
    }),
  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    }),
  confirmPassword: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    }),
}).refine(value => value.password === value.confirmPassword, {
  message: "Passwords must be the same",
  path: ["confirmPassword"]
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
