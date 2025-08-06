import type { Post } from "../../types/Post";
import type { Comments } from "../../types/Comments";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAuthor: boolean;
  comments: Comments[];
  posts: Post[];
};
