import { z, ZodType } from "zod";

export class AdminValidation {
  static readonly FINDBYID: ZodType = z.string().max(100);
}
