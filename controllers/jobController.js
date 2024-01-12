import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export async function getAllJobs(req, res) {
  res.status(200).json({
    results: jobs.length,
    data: jobs,
  });
}

export async function createJob(req, res) {
  const { company, position } = req.body;
  if (!company || !position) {
    return res(400).json({ msg: "Please provide company and position" });
  }

  const id = nanoid(10);

  const job = { id, position, company };
  jobs.push(job);
  res.status(201).json({
    data: job,
  });
}
export async function getJob(req, res) {
  const { id } = req.params;
  // console.log(id);
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    throw new Error(`No job matches the provided id: ${id}`);
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }

  res.status(200).json({ job });
}

export async function editJob(req, res) {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "Please provide company and position" });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }

  job.company = company;
  job.position = position;

  res.status(200).json({ msg: "Job modified", job });
}
export async function deleteJob(req, res) {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res
      .status(404)
      .json({ msg: `No job matches the provided id: ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ status: "success" });
}
