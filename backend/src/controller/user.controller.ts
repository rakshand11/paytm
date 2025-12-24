import type { Request, Response } from "express";
import { signinBody, signupBody } from "../zod/user.js";
import { userModel } from "../model/user.model.js";
import { accountModel } from "../model/account.model.js";
import jwt from "jsonwebtoken";

export const userController = async (req: Request, res: Response) => {
  const { success, data, error } = signupBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "invalid input",
      error: error.format(),
    });
    return;
  }

  const { firstName, lastName, email, password } = data;

  const userAlreadyExist = await userModel.findOne({ email: email });
  if (userAlreadyExist) {
    res.status(411).json({
      msg: "user already exist",
    });
    return;
  }

  const user = await userModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  const userId = user._id;
  await accountModel.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userId }, process.env.USER_MIDDLEWARE as string, {
    expiresIn: "30d",
  });

  res.status(201).json({
    msg: "user signedup successfully",
    user: user,
    token: token,
  });
  return;
};

export const signinController = async (req: Request, res: Response) => {
  const { success, data, error } = signinBody.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "invalid input",
    });
    return;
  }
  const { email, password } = data;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  res.status(200).json({
    msg: "signed in successfully",
    user,
  });
  return;
};

export const bulkUserController = async (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || "";

  const users = await userModel
    .find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    })
    .select("-password");

  res.json({
    users,
  });
};
