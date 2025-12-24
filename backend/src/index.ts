import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.route.js";
import cors from "cors";
import { accountRouter } from "./routes/account.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

const connectToDb = async () => {
  const mongo = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongo || "");
    console.log("successfully connected to db");
  } catch (error) {
    console.error("not connected to db", error);
  }
};
connectToDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/user", userRouter);
app.use("/user", accountRouter);

app.listen(PORT, () => {
  console.log("connected successfully");
});
