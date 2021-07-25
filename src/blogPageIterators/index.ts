import { Config } from "../interfaces";

import { HashnodeBlogsPageIterator } from "./hashnode";
import { DevtoBlogsIterator } from "./devto";

export function getHashnodePageIterator(config: Config) {
  return new HashnodeBlogsPageIterator(config);
}

export function getDevtoPageIterator(config: Config) {
  return new DevtoBlogsIterator(config);
}
