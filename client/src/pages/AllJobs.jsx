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

export async function loader({ request }) {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // console.log(params);

  try {
    const { data } = await customFetch("/jobs", {
      params,
    });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export default AllJobs;
