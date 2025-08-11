import { Router } from "express";
import validateJWTToken from "../middlewares/validateJWTToken.js";
import validateIsAuthor from "../middlewares/validateIsAuthor.js";
import {
  createComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/all-comments/:postId", getAllComments);

commentRouter.use(validateJWTToken);

commentRouter.post("/:postId/comment", createComment);

commentRouter.delete("/:commentId", validateIsAuthor, deleteComment);

export default commentRouter;
