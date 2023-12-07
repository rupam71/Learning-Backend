import checkTokenData from "./checkTokenData";
import * as jwt from "jsonwebtoken";

const regenerateToken = async (token: string, refreshToken: string) => {
  try {
    const tokenDecode: any = checkTokenData(token);
    const refreshTokenDecode: any = checkTokenData(refreshToken);

    if (tokenDecode._id) return { token };
    if (!refreshTokenDecode || !refreshTokenDecode._id) return { status: 400, message: "Unauthenticated" };

    const userData: any = {
      _id: refreshTokenDecode._id,
      type: refreshTokenDecode.type,
    };

    const newToken = jwt.sign(userData, process.env.JWT as string, { expiresIn: "1h" });

    return {
      token: newToken,
    };
  } catch (error) {
    return { status: 400, message: "Unauthenticated" };
  }
};

export default regenerateToken;
