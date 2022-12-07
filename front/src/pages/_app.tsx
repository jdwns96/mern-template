import React, { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import AppSpin from "src/components/common/load/AppSpin";
import client from "src/libs/axios";
import { useAppDispatch, useAppSelector } from "src/store";
import { setAuth } from "src/store/auth";

import toast, { Toaster } from "react-hot-toast";
// pages
import { routes } from "./routes";

export default function App() {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  // UI check (light or dark)
  useEffect(() => {
    const isDark = localStorage.getItem("color-theme") as "dark" | "light" | null | string;
    // check if previously generated color theme
    if (isDark !== null) {
      if (isDark === "dark") {
        document.documentElement.classList.add("dark");
        return void 0;
      }
      if (isDark === "light") {
        document.documentElement.classList.remove("dark");
        return void 0;
      }
      localStorage.removeItem("color-theme");
    }

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (isDark === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, []);

  // login check
  const [initial, setInitial] = useState<boolean>(false);
  useEffect(() => {
    const authentication = async () => {
      try {
        console.log("initialization");
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) return undefined;

        const response = await client.get("/login-check", {
          headers: {
            refresh: refreshToken,
          },
        });
        console.log(response);
        const { data } = response;
        // axios default header
        client.defaults.headers.authorization = `${data.token.accessToken}`; // access
        localStorage.setItem("refresh", data.token.refreshToken); // refresh
        // global store
        dispatch(
          setAuth({
            id: data.user.id,
            user_id: data.user.user_id,
            name: data.user.name,
          }),
        );
      } catch (e) {
        console.log(e);
        // console.log(e.response.status);
      } finally {
        setInitial(true);
      }
    };
    authentication();
  }, []);

  if (!initial) return <AppSpin />;

  //dark:bg-[#2D2D2D]
  return (
    <div className="text-choco-text dark:text-choco-text-dark dark:bg-[#2D2D2D]">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ key, path, Component }) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}
