import { Schema, model } from "mongoose";

interface Chat {
  participants: Schema.Types.ObjectId[];
}

const schema = new Schema<Chat>({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
});

schema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const ChatSchema = model<Chat>("chats", schema);
