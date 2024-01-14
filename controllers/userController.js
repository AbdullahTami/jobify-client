import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export async function getCurrentUser(req, res) {
  res.status(StatusCodes.OK).json({ msg: "get current user" });
}

export async function getApplicationStats(req, res) {
  res.status(StatusCodes.OK).json({ msg: "application stats" });
}

export async function updateUser(req, res) {
  res.status(StatusCodes.OK).json({ msg: "update user" });
}
