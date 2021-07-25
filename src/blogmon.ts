import { Config } from "./interfaces";
import { HashnodeBlogsPaginator } from "./pageIterators";

interface UserNamesConfig {
  hashnodeUserName?: string;
}

export interface BlogMonConfig extends UserNamesConfig, Config {}

export function blogmon(config: BlogMonConfig) {
  const { hashnodeUserName, ...otherConfig } = config;

  if (hashnodeUserName) {
    return new HashnodeBlogsPaginator(otherConfig);
  }

  throw new Error("need atleast one username");
}

export default blogmon;
