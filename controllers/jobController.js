import Job from "../models/jobModel.js";

export async function getAllJobs(req, res) {
  const jobs = await Job.find({});
  res.status(200).json({
    results: jobs.length,
    data: jobs,
  });
}

export async function createJob(req, res) {
  const job = await Job.create(req.body);
  res.status(201).json({
    data: job,
  });
}
export async function getJob(req, res) {
  const { id } = req.params;
  // console.log(id);
  const job = await Job.findById(id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }

  res.status(200).json({ job });
}

export async function editJob(req, res) {
  const { id } = req.params;
  const job = Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!job) {
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }

  res.status(200).json({ msg: "Job modified", job });
}
export async function deleteJob(req, res) {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  // console.log(job);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }
  res.status(200).json({ status: "success" });
}
