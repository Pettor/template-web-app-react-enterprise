import type { ApplicationInfo, ApplicationInfoDto } from "./Types";

export function applicationInfoConvertFromDto(dto: ApplicationInfoDto): ApplicationInfo {
  return {
    version: dto.version,
  };
}
