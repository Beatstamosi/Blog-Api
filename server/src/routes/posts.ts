import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  togglePublish,
  deletePost,
  getPublishedPosts,
} from "../controllers/postsController.js";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import validateIsAuthor from "../middlewares/validateIsAuthor.js";

const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/published", getPublishedPosts);
postsRouter.get("/:postId", getSinglePost);

// check for authentication via JWT Token
postsRouter.use(validateJWTToken);
postsRouter.post("/post", validateIsAuthor, createPost);

postsRouter.put("/post/:postId", validateIsAuthor, updatePost);
postsRouter.put("/post/:postId/publish", validateIsAuthor, togglePublish);

postsRouter.delete("/post/:postId", validateIsAuthor, deletePost);

export default postsRouter;
