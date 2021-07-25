import { BlogsPageIterator, Config, BlogPost } from "./interfaces";
import {
  getDevtoPageIterator,
  getHashnodePageIterator,
} from "./blogPageIterators";

type UserNames = { hashnodeUserName?: string; devtoUserName?: string };
// eslint-disable-next-line no-unused-vars
type Handlers = Record<keyof UserNames, (config: Config) => BlogsPageIterator>;

// Fetches all blog posts using the given user name and iterator constructor
async function getAllBlogPosts(
  userName: string,
  // eslint-disable-next-line no-unused-vars
  fn: (config: Config) => BlogsPageIterator
): Promise<BlogPost[]> {
  const iterator = fn({ userName, perPage: 10000 });

  let blogPosts: BlogPost[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const blogPost of iterator) {
    blogPosts = blogPosts.concat(blogPost);
  }
  return blogPosts;
}

const orderByDate = (a: BlogPost, b: BlogPost): number =>
  (b.dateAdded?.getTime() ?? 0) - (a.dateAdded?.getTime() ?? 0);

// Fetches all blog posts using the given usernames and sorts them by date. Gotta get'em all!
// Might be slow.
function getemAll(userNames: UserNames): Promise<BlogPost[]> {
  const handlers: Handlers = {
    devtoUserName: getDevtoPageIterator,
    hashnodeUserName: getHashnodePageIterator,
  };

  const promises: Promise<BlogPost[]>[] = [];

  const keys = Object.keys(userNames);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i] as keyof UserNames;
    const handler = handlers[key];
    const userName = userNames[key] ?? "";
    promises.push(getAllBlogPosts(userName, handler));
  }

  return Promise.allSettled(promises).then(function (results) {
    let blogPosts: BlogPost[] = [];

    for (let i = 0; i < results.length; i += 1) {
      const result = results[i];
      if (result.status === "fulfilled") {
        blogPosts = blogPosts.concat(result.value);
      }
    }

    // No need to sort, as it will be already in order.
    if (promises.length <= 1) {
      return blogPosts;
    }

    return blogPosts.sort(orderByDate);
  });
}

export {
  getDevtoPageIterator,
  getHashnodePageIterator,
  getemAll as getAllBlogPosts,
};
