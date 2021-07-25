import { BlogPost, BlogsPageIterator } from "../interfaces";

export abstract class BlogPageIteratorBase implements BlogsPageIterator {
  abstract next(): Promise<IteratorResult<BlogPost[]>>;

  async nextPage(): Promise<BlogPost[] | null> {
    const { value, done } = await this.next();
    if (done) return null;

    return value;
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<BlogPost[]> {
    return this;
  }
}
