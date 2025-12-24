import z from "zod";

export const signupBody = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().trim(),
  password: z.string().trim(),
});

export const signinBody = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
});
