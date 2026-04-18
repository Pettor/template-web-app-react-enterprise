import { z } from "zod";

export const QUERY_KEY_PROFILE_INFO = ["profile-info"] as const;

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

// Domain shape normalizes nullable fields to `undefined` (see Convert.ts).
export interface ProfileInfo {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  emailConfirmed: boolean;
  phoneNumber?: string;
  imageUrl?: string;
}
