import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .email("Must be a well-formed e-mail address"),
  password: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters",
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;