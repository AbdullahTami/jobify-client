import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function Register() {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow defaultValue="Abdullah" type="text" name="name" />
        <FormRow
          defaultValue="Tami"
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormRow defaultValue="Riyadh" type="text" name="location" />
        <FormRow defaultValue="abdullah@gmail.com" type="email" name="email" />
        <FormRow defaultValue="test1234" type="password" name="password" />
        <button type="submit" className="btn btn-block">
          {isSubmitting ? "submitting..." : "submit"}
        </button>
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
    console.log("beee");
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export default Register;
