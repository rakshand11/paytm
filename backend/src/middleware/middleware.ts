import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../model/user.model.js";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      token: string | undefined;
      user: any;
    }
  }
}

interface jwtPayload {
  userId: string;
}

export const usermiddleware = process.env.USER_MIDDLEWARE || "";
export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer")) {
    res.status(401).json({
      msg: "token not provided",
    });
    return;
  }
  const token = authheader.split(" ")[1];

  try {
    const decoded = jwt.verify(token || "", usermiddleware) as jwtPayload;
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }

    req.userId = decoded.userId;
    req.token = token;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};
