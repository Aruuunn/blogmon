import { BlogPost } from "./BlogPost";

export interface BlogPostIterator extends AsyncIterableIterator<BlogPost[]> {
  // Returns Pages of Blog Posts of size given in the config. Returns null if reached the end.
  nextPage(): Promise<BlogPost[] | null>;
}
