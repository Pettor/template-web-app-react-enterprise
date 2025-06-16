import type { ApplicationInfo } from "./Classes";
import type { ApplicationInfoDto } from "./Schema";

export function applicationInfoConvertFromDto(dto: ApplicationInfoDto): ApplicationInfo {
  return {
    version: dto.version,
  };
}
