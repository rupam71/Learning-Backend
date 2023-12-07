import { Document } from "mongoose";
import USERTYPE from "./userType";

interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  password: string;
  country: string;
  isVarified: boolean;
  isActive: boolean;
  isPaid: boolean;
  type: USERTYPE;
}

export default IUser;
