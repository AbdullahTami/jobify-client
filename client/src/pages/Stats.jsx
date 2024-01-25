import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { ChartContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch("/jobs/stats");
    console.log(response);
    return response.data;
  },
};

function Stats() {
  const {
    data: { defaultStats, monthlyApplications },
  } = useQuery(statsQuery);
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
}

export const loader = (queryClient) => async () => {
  // return null;
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

export default Stats;
