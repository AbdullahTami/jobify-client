import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { ChartContainer, StatsContainer } from "../components";

function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />

      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
}

export async function loader() {
  try {
    const response = await customFetch("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
}

export default Stats;
