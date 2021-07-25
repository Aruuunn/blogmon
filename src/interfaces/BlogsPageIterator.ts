import { BlogPost } from "./BlogPost";

export interface BlogsPageIterator extends AsyncIterableIterator<BlogPost[]> {
  // Returns Pages of Blog Posts of size given in the config. Returns null if reached the end.
  nextPage(): Promise<BlogPost[] | null>;
}
