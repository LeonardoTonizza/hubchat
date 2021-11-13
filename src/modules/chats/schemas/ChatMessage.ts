import { Schema, model } from "mongoose";

interface ChatMessage {
  chat: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  message: string;
}

const schema = new Schema<ChatMessage>(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "chats",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const ChatMessageSchema = model<ChatMessage>("chat-messages", schema);
