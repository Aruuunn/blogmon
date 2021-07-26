import { BlogPost, BlogPostIterator } from "../interfaces";

export abstract class BlogPageIteratorBase implements BlogPostIterator {
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
