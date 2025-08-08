import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Post } from "../../types/Post.js";
import style from "./AuthorHome.module.css";

function AuthorHome() {
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

  // ---- TODO ----
  // Edit Button

  // Publish / Unpublish Button
  // Delete Button
  // Show Comments Button

  return (
    <div>
      <div>
        <Link to="/author/write-post">Write new Post</Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Published?</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">Show Comments</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <div key={post.id}>
                <th scope="row">{index + 1}</th>
                <td>{post.title}</td>
                <td>{post.author.firstName + " " + post.author.lastName}</td>
                <td>
                  <label className={style.switch}>
                    <input type="checkbox" checked={post.published} />
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>
                </td>
                <td>
                  <Link to={`/edit-post/${post.id}`}>Edit Post</Link>
                </td>
                <td>
                  <button>Delete</button>
                </td>
                <td>
                  <button>Show Comments ({post.comments.length})</button>
                </td>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuthorHome;
