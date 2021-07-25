import { validDateOrUndefined } from "../../utils";
import { BlogPost } from "../../interfaces";

const getPublicationDomianOrDefault = (
  userName: string,
  publicationDomain: string
): string => publicationDomain.trim() || `${userName}.hashnode.dev`;

export const toBlogData =
  (userName: string, publicationDomain: string) =>
  (post: any): BlogPost => ({
    url: `https://${getPublicationDomianOrDefault(
      userName,
      publicationDomain
    )}/${post.slug}`,
    title: post.title,
    coverImageUrl: post.coverImage ?? "",
    description: post.brief ?? "",
    tags: post.tags.map((tag: any): string => tag.name).filter(Boolean),
    dateAdded: validDateOrUndefined(post.dateAdded),
    dateEdited: validDateOrUndefined(post.dateUpdated),
  });

export const pipeThrowErrorIfUserNameIsEmpty = <
  T extends { username?: string | null }
>(
  data: T
): T => {
  if (typeof data?.username !== "string" || data.username.trim().length === 0) {
    throw new Error("username is wrong");
  }

  return data;
};
