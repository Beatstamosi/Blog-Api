export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAuthor: boolean;
  comments: Comment[];
  posts: Post[];
};

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

export type Comment = {
  id: string;
  text: string;
  username: User;
  usernameId: string;
  postedAt: Date;
  Post: Post;
  postId: string;
};
