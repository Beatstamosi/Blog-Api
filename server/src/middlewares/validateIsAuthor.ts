import { Request, Response, NextFunction } from "express";

const validateIsAuthor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAuthor) {
    return res.sendStatus(403);
  }
  next();
};

export default validateIsAuthor;
