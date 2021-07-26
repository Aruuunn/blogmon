import { getAllPosts, UserNames } from "./blogmon";

describe("gotta get'em all", () => {
  it("should fetch all blogs", async () => {
    // I have posts at both these websites, so test should be correct for my usernames
    const userNames: UserNames = {
      devtoUserName: "arunmurugan78",
      hashnodeUserName: "arunmurugan",
    };

    let hasHashnodeArticles = false;
    let hasDevtoArticles = false;

    await getAllPosts(userNames).then((res) => {
      // Expect the received blog posts to be in latest to old order
      for (let i = 0; i < res.length; i++) {
        if (i >= 1 && res[i].dateAdded && res[i - 1].dateAdded) {
          expect(
            (res[i].dateAdded?.getTime() ?? 0) <=
              (res[i].dateAdded?.getTime() ?? 0)
          ).toEqual(true);
        }

        // might not be true when hosted at different domains
        // I haven't used different domain
        if (/hashnode\.dev/.test(res[i].url)) {
          hasHashnodeArticles = true;
        }

        if (/dev\.to/.test(res[i].url)) {
          hasDevtoArticles = true;
        }
      }

      expect(hasHashnodeArticles).toEqual(true);
      expect(hasDevtoArticles).toEqual(true);
    });
  });
});
