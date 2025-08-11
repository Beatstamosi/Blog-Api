import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import handleError from "../services/handleError.js";

const getAllComments = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  if (!postId) return res.status(402).json({ error: "Post Id is missing" });

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        username: true,
      },
    });

    if (comments) {
      res.status(200).json({ comments });
    } else {
      throw new Error("Error fetching comments");
    }
  } catch (e) {
    handleError(e, res);
  }
};

const createComment = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const usernameId = req.user?.id;

  if (!usernameId)
    return res.status(403).json({ error: "Unauthorized access" });

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        text: req.body.comment,
        usernameId,
        postId,
      },
    });
    res.status(201).json({ comment });
  } catch (error) {
    handleError(error, res);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId;

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({ comment });
  } catch (error) {
    handleError(error, res);
  }
};

export { getAllComments, createComment, deleteComment };
