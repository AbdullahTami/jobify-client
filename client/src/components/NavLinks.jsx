import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";

function NavLinks({ isBigSidebar }) {
  const { toggleSidebar, currentUser } = useDashboardContext();
  // console.log(currentUser);
  const { role } = currentUser;
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            onClick={!isBigSidebar && toggleSidebar}
            className="nav-link"
            to={path}
            key={text}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
