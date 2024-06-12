import { ZodType, z } from "zod";

export class ComplaintValidation {
  static readonly CREATE: ZodType = z.object({
    id_user: z.string().max(100),
    description: z.string().min(1).max(100),
  });
  static readonly GET: ZodType = z.string().max(100);
  static readonly GETBYID: ZodType = z.string().max(100);
}
