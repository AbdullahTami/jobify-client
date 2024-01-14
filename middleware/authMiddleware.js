import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export function authenticateUser(req, res, next) {
  const { JWT } = req.cookies;
  console.log("AUTH MIDDLEWARE COOKIE LOG 👋", JWT);
  if (!JWT) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(JWT);
    req.user = { userId, role };
    next();
  } catch (error) {
    console.log(error);
  }
}
