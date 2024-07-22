import { Request } from "../types/Request";
import { Resource } from "../types/Resourse";

export function filterDataByKeyword(requests: Request[], keyword: string): Resource[] {
  const resources: Resource[] = [];

  requests.forEach((request) => {
    request.Resources.forEach((resource) => {
      const filteredPosts = resource.Posts.filter(
        (post) => post.channel.includes(keyword) || post.text.includes(keyword)
      );

      if (filteredPosts.length > 0) {
        resources.push({ ...resource, Posts: filteredPosts });
      }
    });
  });

  return resources;
}
