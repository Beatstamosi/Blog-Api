import { Router } from "express";
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  togglePublish,
  deletePost,
} from "../controllers/postsController.js";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import validateIsAuthor from "../middlewares/validateIsAuthor.js";

const postsRouter = Router();

postsRouter.use(validateJWTToken);

postsRouter.get("/", getAllPosts);
postsRouter.get("/:postId", getSinglePost);

postsRouter.post("/post", validateIsAuthor, createPost);

postsRouter.put("/post/:postId", validateIsAuthor, updatePost);
postsRouter.put("/post/:postId/publish", validateIsAuthor, togglePublish);

postsRouter.delete("/post/:postId", validateIsAuthor, deletePost);

export default postsRouter;
