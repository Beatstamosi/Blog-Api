import { Router } from "express";
import {
  createPost,
  updatePost,
  togglePublish,
  deletePost,
} from "../controllers/postsController.js";
import validateJWTToken from "../middlewares/validateJWTToken.js";

const postsRouter = Router();

postsRouter.post("/post", validateJWTToken, createPost);
postsRouter.put("/post/:postid", validateJWTToken, updatePost);
postsRouter.put("/post/:postid/publish", togglePublish);
postsRouter.delete("/post/:postid", deletePost);

export default postsRouter;
