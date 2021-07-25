import { BlogPostInterface } from "./BlogPostInterface";

export interface BlogsPaginatorInterface
  extends AsyncIterableIterator<BlogPostInterface[]> {
  // Returns Pages of Blog Posts of size given in the config. Returns null if reached the end.
  nextPage(): Promise<BlogPostInterface[] | null>;
}
