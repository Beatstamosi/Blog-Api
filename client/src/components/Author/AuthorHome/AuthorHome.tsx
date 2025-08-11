import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Post } from "../../types/Post.js";
import style from "./AuthorHome.module.css";

function AuthorHome() {
  const [posts, setPosts] = useState<Post[] | undefined>();

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const togglePublish = async (postId: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts/post/${postId}/publish`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok) fetchPosts();
  };

  const deletePost = async (postId: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/posts/post/${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok) {
      fetchPosts();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link to="/author/write-post" className={style.writePostBtn}>
          Write new Post
        </Link>
      </div>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Published?</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Show Comments</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.author.firstName + " " + post.author.lastName}</td>
                <td>
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      checked={post.published}
                      onChange={() => togglePublish(post.id)}
                    />
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>
                </td>
                <td>
                  <Link
                    to={`/author/edit-post/${post.id}`}
                    className={style.link}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className={style.deleteBtn}
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/author/${post.id}/show-comments`}>
                    <button className={style.commentBtn}>
                      Show Comments ({post.comments.length})
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuthorHome;
