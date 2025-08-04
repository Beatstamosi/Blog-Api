import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

const createPost = async (req: Request, res: Response) => {
  if (!req.body.isAdmin) {
    return res.sendStatus(403);
  }

  try {
    const result = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      },
    });

    if (result) {
      res.status(201).json({ post: result });
    } else {
      throw new Error("Error creating post");
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updatePost = async (req: Request, res: Response) => {};

const togglePublish = async (req: Request, res: Response) => {};

const deletePost = async (req: Request, res: Response) => {};

export { createPost, updatePost, togglePublish, deletePost };
