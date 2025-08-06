import type { User } from "../Authentication/types/User";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
  author: User;
  userId: string;
  comments: Comment[];
};
