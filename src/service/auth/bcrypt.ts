import * as bcrypt from "bcrypt";

const saltRounds = 10;

// Hash a password
const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Compare a password with its hash
const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export { hashPassword, comparePassword };
