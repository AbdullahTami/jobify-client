import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        className="btn logout-btn"
        type="button"
        onClick={() => setShowLogout((show) => !show)}
      >
        <FaUserCircle />
        {currentUser.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? "show-dropdown" : ""} `}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
}

export default LogoutContainer;
