import { z, ZodType } from "zod";

export class AdminValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email().max(100),
    password: z.string().min(6).max(100),
    id_school: z.string().max(100),
  });
}
