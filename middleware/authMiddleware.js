import { UnauthenticatedError } from "../errors/customError.js";
import User from "../models/userModel.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export async function authenticateUser(req, res, next) {
  const { JWT } = req.cookies;
  if (!JWT) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(JWT);
    req.user = { userId, role };
    next();
  } catch (error) {}
  console.log(JWT);
}
