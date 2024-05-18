import { Request, Response, NextFunction } from "express"
import AppError from "./appError";

export const catchAsync = <T = any>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};