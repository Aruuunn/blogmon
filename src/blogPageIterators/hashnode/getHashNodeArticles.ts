import axios from "axios";
import { BlogPost } from "../../interfaces";
import { pipeThrowErrorIfUserNameIsEmpty, toBlogData } from "./utils";

const HASHNODE_API_URL = "https://api.hashnode.com/";

// Fetches articles published at HashNode. Can Only get a maximum of 6 articles at a time.
export const getHashNodeArticles = async (
  username: string,
  page: number
): Promise<BlogPost[]> =>
  axios
    .post(HASHNODE_API_URL, {
      query: `query{
            user(username: "${username}") {
                username
                publicationDomain
                publication {
                  posts(page:${page}) {
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
    .then(pipeThrowErrorIfUserNameIsEmpty)
    .then(({ publicationDomain, publication: { posts } }) => ({
      posts,
      publicationDomain,
    }))
    .then(({ posts, publicationDomain }) =>
      posts.map(toBlogData(username, publicationDomain))
    );
