# Blogmon

A npm package to fetch (or **paginate**) blog posts from many blog post publishing websites. Currently supports _only_ dev.to and hashnode.com

> Gotta get'em all!


## Installation

```bash
npm i blogmon
```

## Quick Start

The Recommended way is to use a `BlogPostIterator`.

`getDevtoPostIterator` returns a `BlogPostIterator`.

```javascript
import { getDevtoPostIterator } from "blogmon";

const config = {
  userName: "arunmurugan78",
  perPage: 7, // optional, defaults to 6
};

const devto = getDevtoPostIterator(config);

// returns blog posts of given perPage size. Promise<BlogPost[]>
// Useful in Paginating the results
devto.nextPage().then((blogPosts) => {
  if (blogPosts) {
    // do something with the results, like displaying the details.
    // blogPosts will be of length less than or equal to perPage provided in config
    for (const blogPost of blogPosts) {
      console.log(blogPost.title);
    }
  } else {
    // reached end of results
    console.log("end of result. traversed all blog posts!");
  }
});
```

`BlogPost` data is of the following form.

```typescript
// BlogPost.ts
export interface BlogPost {
  url: string;
  coverImageUrl: string;
  title: string;
  description: string;
  dateAdded?: Date;
  dateEdited?: Date;
  tags: string[];
}
```

Like for dev.to, you can use `getHashnodePostIterator`.

To get all Blog Posts from all the provided websites use `getAllPosts`.

```javascript
import { getDevtoPostIterator } from "blogmon";

// blogPosts will be fetched for the provided usernames
const usernames = {
  devtoUserName: "arunmurugan78",
  hashnodeUserName: "arunmurugan",
};

/**
 * Fetches all the blog posts. might get slow if you have a lot of blog posts.
 */
getAllPosts(usernames).then((blogPosts) => {
  // blogPosts will be in the latest to oldest dateAdded order.
  // do whatever you want to do with blogPosts
});
```

