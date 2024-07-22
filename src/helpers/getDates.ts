import { Post } from "../types/Post";

export function getDates(posts: Post[]) {
  const dates = posts.map((post: any) => post.pub_date).reverse();

  return dates;
}
