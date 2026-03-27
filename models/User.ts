import { Model, Schema, model, models } from "mongoose";

export type UserRole = "buyer" | "seller";

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  trustScore: number;
  activeDisputes: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["buyer", "seller"], required: true },
    trustScore: { type: Number, default: 50 },
    activeDisputes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const UserModel =
  (models.User as Model<UserDocument>) || model<UserDocument>("User", userSchema);
