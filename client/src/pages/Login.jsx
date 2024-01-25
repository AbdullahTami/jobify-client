import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormRow, Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  async function loggingDemoUser() {
    try {
      const data = {
        email: "test@gmail.com",
        password: "test1234",
      };
      await customFetch.post("/auth/login", data);
      toast.success("Test the app!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="abdullah@gmail.com" />
        <FormRow type="password" name="password" defaultValue="test1234" />
        <SubmitBtn />
        <button
          type="button"
          className="btn btn-block"
          onClick={loggingDemoUser}
        >
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

export default Login;
