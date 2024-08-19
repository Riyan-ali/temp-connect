import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Must be atleast 3 characters long"],
      maxlength: [30, "Can't exceed 30 characters"],
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      default: "public",
    },
    secret: {
      type: String,
      required: false,
    },
    theme: {
      type: String,
      required: true,
      default: "normal",
    },
    grouplimit: {
      type: Number,
      required: false,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
