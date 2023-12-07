import * as jwt from "jsonwebtoken";

const checkTokenData = (token: string) => {
  try {
    return jwt.verify(token as string, process.env.JWT as string);
  } catch (error) {
    return "";
  }
};

export default checkTokenData;
