import mongoose, { Document, Schema } from "mongoose";
import { IUser, USERTYPE } from "../type";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  country: {
    type: String,
    default: "Bangladesh",
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: USERTYPE.USER,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
