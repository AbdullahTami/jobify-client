import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export async function getCurrentUser(req, res) {
  const currentUser = await User.findOne({ _id: req.user.userId }).select(
    "-password"
  );

  res.status(StatusCodes.OK).json({ currentUser });
}

export async function updateUser(req, res) {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "user updated" });
}

export async function getApplicationStats(req, res) {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
}
