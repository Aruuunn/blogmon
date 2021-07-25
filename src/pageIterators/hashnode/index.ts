import { BlogPost, Config, BlogsPageIterator } from "../../interfaces";
import { BlogPageIteratorBase } from "../BlogPageIteratorBase";
import { getHashNodeArticles } from "./getHashNodeArticles";

export class HashnodeBlogsPaginator
  extends BlogPageIteratorBase
  implements BlogsPageIterator
{
  private userName: string;

  private page = 0;

  private perPage = 6;

  private done = false;

  private buffer: BlogPost[] = [];

  constructor(config: Config) {
    super();

    this.userName = config.userName;

    if (typeof config.perPage === "number" && config.perPage > 0) {
      this.perPage = config.perPage;
    }
  }

  async next(): Promise<IteratorResult<BlogPost[]>> {
    while (this.buffer.length < this.perPage && !this.done) {
      // eslint-disable-next-line  no-await-in-loop
      const posts = await getHashNodeArticles(this.userName, this.page);
      if (posts.length === 0) {
        this.done = true;
      }
      this.page += 1;
      this.buffer = this.buffer.concat(posts);
    }

    const value = this.buffer.splice(0, this.perPage);

    return { value, done: value.length === 0 && this.done };
  }
}

export default HashnodeBlogsPaginator;
