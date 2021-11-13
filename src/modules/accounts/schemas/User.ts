import { Schema, model, Model } from "mongoose";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {
  compareHash: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<UserDocument> {
  generateToken: (userId: string) => string;
}

const schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

schema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const passwordHash = await hash(this.password, 8);
    this.password = passwordHash;
  }

  next();
});

schema.methods.compareHash = function (password: string): Promise<boolean> {
  return compare(password, this.password);
};

schema.statics.generateToken = function (userId: string): string {
  const { expires_in_token, secret_token } = auth;

  const token = sign({}, secret_token, {
    subject: userId,
    expiresIn: expires_in_token,
  });

  return token;
};

export const UserSchema = model<UserDocument, UserModel>("users", schema);
