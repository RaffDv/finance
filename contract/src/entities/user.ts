import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});

type userType = z.infer<typeof userSchema>;

export { userSchema, type userType };
