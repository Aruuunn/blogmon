import { fetchBlogs } from "./fetchBlogs";
import { assertBlogPostShape } from "../../utils/assertBlogPost.testutil";

describe("fetch blogs from dev.to", () => {
  it("should fetch blogs", async () => {
    await fetchBlogs("arunmurugan78").then((posts) =>
      posts.forEach((post) => {
        assertBlogPostShape(post);
      })
    );
  });
});
