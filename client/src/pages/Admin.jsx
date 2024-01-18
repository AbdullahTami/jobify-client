import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from "../components";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

function Admin() {
  const { users, jobs } = useLoaderData();
  console.log(users, jobs);
  return (
    <Wrapper>
      <StatItem
        title="current users"
        bcg="#fcefc7"
        count={users}
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
      />
      <StatItem
        title="total jobs"
        bcg="#e0e8f9"
        count={jobs}
        icon={<FaCalendarCheck />}
        color="#647acb"
      />
    </Wrapper>
  );
}

export async function loader() {
  try {
    const res = await customFetch("users/admin/app-stats");
    return res.data;
  } catch (error) {
    toast.error("you are not authorized to view this page!");
    return redirect("/dashboard");
  }
}

export default Admin;
