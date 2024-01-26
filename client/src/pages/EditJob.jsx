import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { Form, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const editJobQuery = (id) => {
  return {
    queryKey: ["editJob", id],
    queryFn: async () => {
      const { data } = await customFetch(`/jobs/${id}`);
      return data;
    },
  };
};
function EditJob() {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(editJobQuery(id));
  console.log(job);

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job?.position} />
          <FormRow type="text" name="company" defaultValue={job?.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job?.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job?.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job?.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    await queryClient.ensureQueryData(editJobQuery(params.id));
    return params.id;
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    // console.log(params);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      toast.success("job edited successfully");
      queryClient.invalidateQueries(["jobs"]);

      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

export default EditJob;
