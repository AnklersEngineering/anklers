import { MediaQueriesService } from "./media-queries.service";
import { PlatformService } from "./platform.service";

export * from "./media-queries.service";
export * from "./platform.service";

export const ROOT_CORE_SERVICES = [PlatformService, MediaQueriesService];
