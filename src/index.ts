import { getLatestHashnodePosts, getMediumArticles } from "./blogs";
import { UsernameConfig } from "./types/Config";

export const getBlogs = async (
  type: "medium" | "hashnode" | "all",
  username: UsernameConfig
) => {
  if (type === "medium") {
    return getMediumArticles(username.mediumUsername);
  }
  if (type === "hashnode") {
    return getLatestHashnodePosts(username.hashnodeUsername);
  }
  const mediumArticles = await getMediumArticles(username.mediumUsername);
  const hashnodePosts = await getLatestHashnodePosts(username.hashnodeUsername);
  return {
    mediumArticles,
    hashnodePosts,
  };
};

export * from "./types";
