import * as UserService from "../../user/service";
import { IUser } from "../../user/type";
import { comparePassword } from "../bcrypt";
import * as jwt from 'jsonwebtoken';


const login = async (auth: {email?:string, mobile?:string, password:string}) => {
  let key = auth.email ? 'email' : 'mobile'
  let value = auth.email || auth.mobile

  const user: IUser | null = await UserService.findLoginUser({[key]: value})

  if(!user) return { status: 404, data: null, message: `Your ${key} is not valid` };

  // TODO
  // check isVarified        
  // send email

  console.log({user})

  const isPasswordOk = await comparePassword(auth.password, user.password)
  if(!isPasswordOk) return { status: 400, data: null, message: `Your password not matched.` };

  const userData:any = {
    _id: user._id,
    type: user.type
  };

  const token = jwt.sign(userData, process.env.JWT as string, { expiresIn: '1h' });
  const refreshToken = jwt.sign(userData, process.env.JWT as string, { expiresIn: '1d' });

  return {
    token,
    refreshToken
  };
  
}

export default login;
