import { Post } from "./Post";

export interface Resource {
  ResourceID: number;
  Posts: Post[];
}
