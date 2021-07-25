/// <reference  types="jest"/>

export function assertBlogPostShape(post: any) {
  expect(typeof post.url).toEqual("string");

  expect(post.tags).toBeInstanceOf(Array);
  for (const tag of post.tags) {
    expect(typeof tag).toEqual("string");
  }
  expect(typeof post.title).toEqual("string");
  expect(typeof post.description).toEqual("string");
  expect(typeof post.coverImageUrl).toEqual("string");

  if (post.dateAdded) expect(post.dateAdded).toBeInstanceOf(Date);

  if (post.dateEdited) expect(post.dateEdited).toBeInstanceOf(Date);
}
