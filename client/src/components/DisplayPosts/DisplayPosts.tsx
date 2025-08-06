import { useState, useEffect } from "react";
import type { Post } from "../types/Post";
import PostPreview from "../PostPreview/PostPreview";

function DisplayPosts() {
  const [posts, setPosts] = useState<Post[] | undefined>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`);

        const data = await res.json();

        if (res) {
          setPosts(data.posts);
        } else {
          throw new Error("Posts could not be fetched");
        }
      } catch (e) {
        console.error("Error fetching Posts: ", e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts && posts.map((post) => <PostPreview post={post} key={post.id} />)}
    </>
  );
}

export default DisplayPosts;
