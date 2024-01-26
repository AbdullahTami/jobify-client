import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries(["jobs"]);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
