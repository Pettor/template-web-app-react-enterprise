import { z } from "zod";

export const tokenSchema = z.object({
  token: z.string(),
  refreshTokenExpiryTime: z.string(),
});

export type TokenDto = z.infer<typeof tokenSchema>;
