import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers//DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function AddJob() {
  const { currentUser } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={currentUser.location}
          />
          <FormRowSelect
            list={Object.values(JOB_STATUS)}
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            list={Object.values(JOB_TYPE)}
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("job successfully added");
      return redirect("all-jobs");
    } catch (error) {
      return error;
    }
  };

export default AddJob;
