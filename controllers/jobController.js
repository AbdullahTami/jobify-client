import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModel.js";

export async function getAllJobs(req, res) {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({
    results: jobs.length,
    data: jobs,
  });
}

export async function createJob(req, res) {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({
    data: job,
  });
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
}

export async function editJob(req, res) {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Job modified", job });
}

export async function deleteJob(req, res) {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ status: "success" });
}
