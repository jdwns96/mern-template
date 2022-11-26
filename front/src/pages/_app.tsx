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
  useEffect(() => {}, []);

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

  return (
    <div className="text-choco-text dark:text-choco-text-dark">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ key, path, Component }) => (
          <Route key={key} path={path} element={<Component />} />
        ))}
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}
