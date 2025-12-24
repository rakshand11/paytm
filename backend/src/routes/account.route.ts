import { Router } from "express";
import { accountModel } from "../model/account.model.js";
import { userController } from "../controller/user.controller.js";
import {
  getBalance,
  transferController,
} from "../controller/account.controller.js";
import { middleware } from "../middleware/middleware.js";

export const accountRouter: Router = Router();

accountRouter.get("/balance", middleware, getBalance);
accountRouter.post("/transfer", middleware, transferController);
