import type { User } from "../Authentication/types/User";
import type { Post } from "./Post";

export type Comments = {
  id: string;
  text: string;
  username: User;
  usernameId: string;
  postedAt: Date;
  Post: Post;
  postId: string;
};
