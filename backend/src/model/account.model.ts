import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  balance: {
    type: Number,
    required: true,
  },
});

export const accountModel = mongoose.model("account", accountSchema);
