import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Loader, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useEffect, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

function DashboardLayout() {
  const navigate = useNavigate();

  const { currentUser } = useLoaderData();

  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const isPageLoading = navigation.state === "loading";

  function toggleDarkTheme() {
    setIsDarkTheme((dark) => !dark);
  }

  function toggleSidebar() {
    setShowSidebar((show) => !show);
  }

  async function logoutUser() {
    await customFetch("/auth/logout");
    navigate("/");
    toast.success("User successfully logged out");
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
        currentUser,
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
              {isPageLoading ? (
                <Loader />
              ) : (
                // <Outlet context={{ currentUser }} />
                <Outlet context={{ currentUser }} />
              )}
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

export async function loader() {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
}

export default DashboardLayout;
