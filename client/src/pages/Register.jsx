import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../components";

function Register() {
  return (
    <Wrapper>
      <form className="form">
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
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
