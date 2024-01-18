import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export async function getCurrentUser(req, res) {
  const currentUser = await User.findOne({ _id: req.user.userId }).select(
    "-password"
  );

  res.status(StatusCodes.OK).json({ currentUser });
}

export async function updateUser(req, res) {
  // console.log(req.file);

  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
    console.log(response);
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user updated" });
}

export async function getApplicationStats(req, res) {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
}
