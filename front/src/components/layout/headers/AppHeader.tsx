import React, { useEffect, useRef, useState } from "react";
import { AccountCircle, EggAlt, Home, MenuBook, Person, Search, Settings, Telegram } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { removeAuth } from "src/store/auth";
import client from "src/libs/axios";

import Logo from "src/assets/svg/ChocolatLait";

const HEADER = { backgroundColor: "inherit", boxShadow: "none" };

export default function AppHeader() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState<boolean>(localStorage.getItem("color-theme") === "dark" ? true : false);
  const onDarkModeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDark = e.target.checked;
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
    setIsDark(isDark);
  };

  const accountMenu = useRef(null);
  useClickOutside(accountMenu, () => {
    setAccountToggle(false);
  });
  const [accountToggle, setAccountToggle] = useState(false);

  const onLogout = async () => {
    try {
      // @TODO
      // remove server table data
    } catch (e) {
      console.log(e);
    } finally {
      localStorage.removeItem("refresh"); // remove refresh
      dispatch(removeAuth()); // remove store
      delete client.defaults.headers.authorization; // remove axios default header
      navigate("/signin"); // redirect
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#F8F9F9] z-10 px-0 shadow-md border-solid border-b-4 border-choco-bronze-100 dark:bg-[hsl(0,0%,22.5%)] dark:text-choco-bronze-100">
      <AppBar position="static" sx={HEADER} className="max-w-3xl mx-auto">
        <Toolbar variant="dense" className="flex justify-between" sx={{ padding: 0 }}>
          <div
            className="flex  cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Logo />
            </IconButton> */}
            <span className="px-2">
              <Logo />
            </span>
            <Typography variant="h6" color="inherit" component="div" className="flex items-center">
              <span className="text-choco-bronze-200 ">CHOCO</span>
            </Typography>
          </div>
          <ul className="flex items-center h-12">
            <li
              className="relative p-2 px-1.5 cursor-pointer hover: transition-all  hidden md:block"
              onClick={() => {
                navigate("/");
              }}
            >
              <Home style={{ color: "hsl(28,31%,52%)" }} />
            </li>
            <li className="relative p-2 px-1.5 cursor-pointer hover: transition-all  hidden md:block">
              <Search style={{ color: "hsl(28,31%,52%)" }} />
            </li>
            <li className="relative p-2 px-1.5 cursor-pointer hover: transition-all  hidden md:block">
              <Telegram style={{ color: "hsl(28,31%,52%)" }} />
            </li>
            <li className="relative transition-all" ref={accountMenu}>
              <div
                className="cursor-pointer p-2 px-1.5 "
                onClick={() => {
                  setAccountToggle((p) => !p);
                }}
              >
                {/* <span>{user_id}</span> */}
                <div className="">
                  <div className="w-6 h-6 rounded-full  border border-solid edge-border"></div>
                </div>
              </div>
              <article
                className={cn(
                  "dark:bg-[#2D2D2D] dark:text-choco-bronze-100 dark:border-choco-silver-300",
                  "block  transition-all z-50 overflow-auto bg-white text-[#262626] shadow-lg",
                  "fixed top-12 bottom-0 left-0 right-0 w-full h-screen border-t border-solid ",
                  "md:absolute md:top-14 md:right-0 md:bottom-[unset] md:w-[240px] md:h-auto md:border md:border-solid ",
                  "md:left-[unset]",
                  !accountToggle && "hidden",
                )}
              >
                <ul className="py-1 text-sm  choco-border-b dark:border-choco-silver-300">
                  <li
                    className="flex items-center   px-4 py-2 hover:bg-gray-50 transition-all cursor-pointer dark:hover:bg-choco-bronze-300"
                    onClick={() => {
                      navigate(`/${user_id}`);
                    }}
                  >
                    <div className="text-sm">
                      <AccountCircle style={{ color: "hsl(28,31%,52%)" }} />
                    </div>
                    <div className="text-md ml-2  ">
                      <span>프로필</span>
                    </div>
                  </li>
                  <li
                    className="flex items-center   px-4 py-2 hover:bg-gray-50 transition-all cursor-pointer dark:hover:bg-choco-bronze-300"
                    onClick={() => {
                      navigate(`/account`);
                    }}
                  >
                    <div className="text-sm">
                      <Settings style={{ color: "hsl(28,31%,52%)" }} />
                    </div>
                    <div className="text-md ml-2  ">
                      <span>계정관리</span>
                    </div>
                  </li>
                </ul>
                <nav className="px-5 py-2 choco-border-b flex justify-between dark:border-choco-silver-300 transition-all">
                  <span className=" text-sm">DARK MODE</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onChange={onDarkModeToggle} checked={isDark} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-choco-bronze-100 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-choco-bronze-300"></div>
                  </label>
                </nav>
                <div className="flex border-solid  border-gray-300 px-5 py-2 hover:bg-gray-50  cursor-pointer dark:hover:bg-choco-bronze-300 transition-all" onClick={onLogout}>
                  <button className="text-sm">
                    <span>로그아웃</span>
                  </button>
                </div>
              </article>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </header>
  );
}

function useClickOutside(ref: any, onClickOutside: any) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
