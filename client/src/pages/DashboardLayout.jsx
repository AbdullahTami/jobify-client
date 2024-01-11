import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useEffect, useState } from "react";
import { checkDefaultTheme } from "../App";

const DashboardContext = createContext();

function DashboardLayout() {
  // Temp
  const user = { name: "Abdullah" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  function toggleDarkTheme() {
    setIsDarkTheme((dark) => !dark);
  }

  function toggleSidebar() {
    setShowSidebar((show) => !show);
  }

  async function logoutUser() {
    console.log("logout user");
  }

  useEffect(
    function () {
      document.body.classList.toggle("dark-theme", isDarkTheme);
      localStorage.setItem("darkTheme", isDarkTheme);
    },
    [isDarkTheme]
  );

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleDarkTheme,
        toggleSidebar,
        isDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  return context;
}

export default DashboardLayout;
