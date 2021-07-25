import { DevtoBlogsIterator } from ".";
import { assertBlogPostShape } from "../../utils/assertBlogPost.testutil";

/**
 * @TODO refactor common logic between tests in devto and hashnode
 */

describe("test devto blog page iterator", () => {
  function assertForUserName(
    userName: string,
    perPage: number,
    maxIter: number
  ) {
    it(`should fetch blogs in pages of size perPage. username: ${userName}`, async () => {
      const blogPageIterator = new DevtoBlogsIterator({ userName, perPage });

      const s = new Set();
      let iter = 0;
      for await (const blogPage of blogPageIterator) {
        expect(blogPage.length <= perPage).toEqual(true);

        for (const blogPost of blogPage) {
          expect(s.has(blogPost.url)).toEqual(false);
          s.add(blogPost.url);

          assertBlogPostShape(blogPost);
        }

        iter++;

        if (iter >= maxIter) {
          break;
        }
      }
    });
  }

  assertForUserName("arunmurugan78", 3, 3);

  assertForUserName("devteam", 5, 3);
});
