import { z } from "zod";

export const QUERY_KEY_APPLICATION_INFO = ["application-info"] as const;

export const applicationInfoSchema = z.object({
  version: z.string(),
});

export type ApplicationInfoDto = z.infer<typeof applicationInfoSchema>;

// Domain shape matches the wire DTO today; alias keeps a single source of truth
// while preserving the domain-vs-DTO boundary for future divergence.
export type ApplicationInfo = ApplicationInfoDto;
