import Wrapper from "../assets/wrappers/ThemeToggle";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout";

function ThemeToggle() {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillMoonFill className="toggle-icon" />
      ) : (
        <BsFillSunFill className="toggle-icon" />
      )}
    </Wrapper>
  );
}

export default ThemeToggle;
