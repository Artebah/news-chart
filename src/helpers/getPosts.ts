import { Resource } from "../types/Resourse";

export function getPosts(resources: Resource[]) {
  const posts = resources.flatMap((resource) => resource.Posts);

  return posts;
}
