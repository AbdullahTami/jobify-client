import { StatusCodes } from "http-status-codes";

function globalErrorHandlerMiddleware(error, req, res, next) {
  console.log(error);
  console.log(error.message);
  console.log(error.stack);
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = error.message || "Something went wrong, try agin later";
  res.status(statusCode).json({ msg });
}

export default globalErrorHandlerMiddleware;
