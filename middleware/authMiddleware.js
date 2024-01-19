import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export function authenticateUser(req, res, next) {
  const { JWT } = req.cookies;
  console.log("AUTH MIDDLEWARE COOKIE LOG 👋", JWT);
  if (!JWT) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJWT(JWT);
    const testUser = userId === "65a97f775f84e1527100305d";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    console.log(error);
  }
}

export function authorizePermissions(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("unauthorized to access this route");
    }
    console.log(roles);
    next();
  };
}

export function checkForTestUser(req, res, next) {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only!");
  next();
}
