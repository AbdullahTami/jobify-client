import { Form, Link, redirect } from "react-router-dom";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function Register() {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow placeholder="First name" type="text" name="name" />
        <FormRow
          placeholder="Last name"
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow placeholder="Riyadh" type="text" name="location" />
        <FormRow type="email" name="email" placeholder="demo@gmail.com" />
        <FormRow type="password" placeholder="******" name="password" />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export default Register;
