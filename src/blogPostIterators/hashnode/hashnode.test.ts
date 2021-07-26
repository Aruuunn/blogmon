import axios from "axios";
import { HashnodePostIterator } from ".";
import { BlogPostIterator } from "../../interfaces";
import { assertBlogPostShape } from "../../utils/assertBlogPost.testutil";

jest.setTimeout(25000);

describe("HashNode Blog Iterator", () => {
  function assertForUserName(userName: string, perPage = 1, maxIterations = 3) {
    it(
      "should be able to iterate through blog pages of given size for userName: " +
        userName,
      async () => {
        const blogIterator: BlogPostIterator = new HashnodePostIterator({
          userName,
          perPage,
        });

        let iter = 0;

        const s = new Set();

        for await (const blogPage of blogIterator) {
          expect(blogPage.length <= perPage).toEqual(true);

          for (const blog of blogPage) {
            expect(s.has(blog.url)).toEqual(false);

            assertBlogPostShape(blog);

            await axios(blog.url, { method: "HEAD" });

            s.add(blog.url);
          }

          iter++;

          if (iter === maxIterations) {
            break;
          }
        }
      }
    );
  }

  assertForUserName("arunmurugan");
  assertForUserName("victoria", 3, 2);

  it("should throw error if userName is wrong", async () => {
    const blogIterator = new HashnodePostIterator({
      userName: "wrongsdhfishdjk",
      perPage: 2,
    });

    await expect(blogIterator.next()).rejects.toThrowError();
  });
});
