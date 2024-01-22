import day from "dayjs";
import Wrapper from "../assets/wrappers/Job.js";
import JobInfo from "./JobInfo.jsx";
import { FaBriefcase, FaCalendar, FaLocationArrow } from "react-icons/fa";
import { Form, Link } from "react-router-dom";

function Job({ job }) {
  const { _id, position, createdAt, company, jobLocation, jobType, jobStatus } =
    job;
  const date = day(createdAt).format("MMM D, YYYY");
  // console.log(date);
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendar />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer>
          <div className="actions">
            <Link to={`../edit-job/${_id}`} className="btn edit-btn">
              Edit
            </Link>
            <Form method="post" action={`../delete-job/${_id}`}>
              <button type="submit" className="btn delete-btn">
                Delete
              </button>
            </Form>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Job;
