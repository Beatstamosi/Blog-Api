import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import handleError from "../services/handleError.js";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json({ posts });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      },
    });

    res.status(201).json({ post });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      },
    });

    res.status(200).json({ post });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const togglePublish = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: !post.published,
      },
    });

    res.status(200).json({ post: updatedPost });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).json({ post: deletedPost });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  togglePublish,
  deletePost,
};
