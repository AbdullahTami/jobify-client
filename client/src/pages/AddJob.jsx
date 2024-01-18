import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/wrappers//DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function AddJob() {
  const { currentUser } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
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

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/jobs", data);
    toast.success("job successfully added");
    return redirect("all-jobs");
  } catch (error) {
    return error;
  }
}

export default AddJob;
