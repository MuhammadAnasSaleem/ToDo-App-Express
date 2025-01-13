import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    todocontent: { type: String, required: true },
    ip: { type: String },
    // owner/todoAddBy: { type: Schema.ObjectId, ref: "User" },
    id: { type: String },
  },
  { timestamps: true }
);

export const Todo = model("Todo", todoSchema);
