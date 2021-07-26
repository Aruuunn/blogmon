import { Config } from "../interfaces";

import { HashnodePostIterator } from "./hashnode";
import { DevtoPostIterator } from "./devto";

export function getHashnodePostIterator(config: Config) {
  return new HashnodePostIterator(config);
}

export function getDevtoPostIterator(config: Config) {
  return new DevtoPostIterator(config);
}
