import { z } from "zod";

export const profileInfoSchema = z.object({
  id: z.string(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  isActive: z.boolean(),
  emailConfirmed: z.boolean(),
  phoneNumber: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

export type ProfileInfoDto = z.infer<typeof profileInfoSchema>;
