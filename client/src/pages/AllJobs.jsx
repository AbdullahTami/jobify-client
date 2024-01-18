import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

const AllJobsContext = createContext();

function AllJobs() {
  const data = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export function useAllJobsContext() {
  return useContext(AllJobsContext);
}

export async function loader() {
  try {
    const { data } = await customFetch("/jobs");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export default AllJobs;
