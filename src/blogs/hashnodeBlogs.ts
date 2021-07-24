import axios from "axios";
import { BlogPostInterface } from "../types";
import { validDateOrUndefined } from "../utils";
import { Config } from "../types/Config";

const HASHNODE_API_URL = "https://api.hashnode.com/";

const toBlogData =
  (publicationDomain: string) =>
  (post: any): BlogPostInterface => ({
    url: `https://${publicationDomain}/${post.slug}`,
    title: post.title,
    coverImageUrl: post.coverImage ?? "",
    description: post.brief ?? "",
    tags: post.tags.map((tag: any): string => tag.name).filter(Boolean),
    dateAdded: validDateOrUndefined(post.dateAdded),
    dateEdited: validDateOrUndefined(post.dateUpdated),
  });

// Fetches articles published at HashNode. Can Only get a maximum of 6 articles at a time.
const getHashNodeArticles = async (
  username: string,
  page: number
): Promise<BlogPostInterface[]> =>
  axios
    .post(HASHNODE_API_URL, {
      query: `query{
            user(username: "${username}") {
                publicationDomain
                publication {
                  posts(page:${page}) {
                    author{
                      username
                      name
                      photo
                    }
                    title
                    coverImage
                    brief
                    dateAdded
                    dateUpdated
                    slug
                    tags {
                      name
                    }
                  }
                }
            }
        }`,
    })
    .then((response) => response.data?.data?.user)
    .then(({ publicationDomain, publication: { posts } }) => ({
      posts,
      publicationDomain,
    }))
    .then(({ posts, publicationDomain }) =>
      posts.map(toBlogData(publicationDomain))
    );

export class HashnodeBlogIterator
  implements AsyncIterableIterator<BlogPostInterface[]>
{
  private userName: string;

  private page = 0;

  private perPage = 6;

  private done = false;

  private buffer: BlogPostInterface[] = [];

  constructor(config: Config) {
    this.userName = config.userName;

    if (typeof config.perPage === "number" && config.perPage > 0) {
      this.perPage = config.perPage;
    }
  }

  async hasNext(): Promise<boolean> {
    return (
      !this.done &&
      (await getHashNodeArticles(this.userName, this.page)).length > 0
    );
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<BlogPostInterface[]> {
    return this;
  }

  async next(): Promise<IteratorResult<BlogPostInterface[]>> {
    while (this.buffer.length < this.perPage && !this.done) {
      // eslint-disable-next-line  no-await-in-loop
      const posts = await getHashNodeArticles(this.userName, this.page);
      if (posts.length === 0) {
        this.done = true;
      }
      this.page += 1;
      this.buffer = this.buffer.concat(posts);
    }

    return { value: this.buffer.splice(0, this.perPage), done: this.done };
  }
}

export default HashnodeBlogIterator;
