import { type Request, type Response } from "express";
import { accountModel } from "../model/account.model.js";
import mongoose from "mongoose";

export const getBalance = async (req: Request, res: Response) => {
  try {
    // userId comes from middleware
    // @ts-ignore
    const userId = req.userId;

    const account = await accountModel.findOne({ userId });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    res.status(200).json({
      balance: account.balance,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const transferController = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await accountModel
    .findOne({ userId: req.userId })
    .session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "invalid account",
    });
    return;
  }

  const toAccount = await accountModel.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "invalid account",
    });
    return;
  }

  await accountModel
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);

  await accountModel
    .updateOne({ userId: to }, { $inc: { balance: amount } })
    .session(session);

  await session.commitTransaction();
  res.status(200).json({
    msg: "transfer successfull",
  });
  return;
};
