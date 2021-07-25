import axios from "axios";
import { BlogPost } from "../../interfaces/BlogPost";
import { validDateOrUndefined } from "../../utils";

const DEV_TO_API_URL = "https://dev.to/api/articles";

const mapPosts = (posts: any[]): BlogPost[] =>
  posts.map((post) => ({
    title: post.title,
    tags: post.tag_list,
    url: post.url,
    description: post.description,
    coverImageUrl: post.cover_image,
    dateAdded: validDateOrUndefined(post.published_at),
    dateEdited: validDateOrUndefined(post.edited_at),
  }));

export const fetchBlogs = (
  username: string,
  perPage = 6,
  page = 0
): Promise<BlogPost[]> =>
  axios(
    `${DEV_TO_API_URL}?username=${username.trim()}&per_page=${perPage}&page=${page}`
  )
    .then((res) => res.data)
    .then(mapPosts);
