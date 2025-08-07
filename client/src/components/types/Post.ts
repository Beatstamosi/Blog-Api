import type { User } from "../Authentication/types/User";
import type { Comments } from "./Comments";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
  author: User;
  userId: string;
  comments: Comments[];
};
