import { Router } from "express";
import {
  bulkUserController,
  signinController,
  userController,
} from "../controller/user.controller.js";
import { middleware } from "../middleware/middleware.js";

export const userRouter: Router = Router();

userRouter.post("/signup", userController);
userRouter.post("/signin", signinController);
userRouter.get("/bulk", middleware, bulkUserController);
