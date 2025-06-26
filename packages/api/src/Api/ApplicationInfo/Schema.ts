import { z } from "zod";

export const applicationInfoSchema = z.object({
  version: z.string(),
});

export type ApplicationInfoDto = z.infer<typeof applicationInfoSchema>;
