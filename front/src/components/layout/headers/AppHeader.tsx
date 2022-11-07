import React, { useEffect, useRef, useState } from "react";
import { EggAlt, Home, MenuBook, Person, Search, Telegram } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "src/store";
import cn from "classnames";

const HEADER = { backgroundColor: "#1f8ce6", boxShadow: "none" };

export default function AppHeader() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  const accountMenu = useRef(null);
  useClickOutside(accountMenu, () => {
    setAccountToggle(false);
  });
  const [accountToggle, setAccountToggle] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-snack-sky z-10 px-0 shadow-snack">
      <AppBar position="static" sx={HEADER} className="max-w-3xl mx-auto">
        <Toolbar variant="dense" className="flex justify-between" sx={{ padding: 0 }}>
          <div className="flex text-snack-gold cursor-pointer">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <EggAlt />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" className="flex items-center">
              SNACK
            </Typography>
          </div>
          <ul className="flex items-center h-12">
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all snack-after-bar hidden md:block">
              <Home />
            </li>
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all snack-after-bar hidden md:block">
              <Search />
            </li>
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all snack-after-bar hidden md:block">
              <Telegram />
            </li>
            <li className="relative transition-all" ref={accountMenu}>
              <div
                className="cursor-pointer hover:text-snack-gold p-3  "
                onClick={() => {
                  setAccountToggle((p) => !p);
                }}
              >
                <span>{user_id}</span>
              </div>
              <article
                className={cn(
                  "block  transition-all z-50 overflow-auto text-white bg-snack-sky shadow-snack",
                  "fixed top-12 bottom-0 left-0 right-0 w-full h-screen border-t border-solid ",
                  "md:absolute md:top-12 md:right-0 md:bottom-[unset] md:w-[280px] md:h-auto md:border md:border-solid ",
                  "md:left-[unset]",
                  !accountToggle && "hidden",
                )}
              >
                <ul className="py-4 px-5 text-sm  border-solid border-b ">
                  <li className="flex justify-between  text-xs  font-semibold mb-3">
                    <p>유저정보</p>
                    <p
                      className=" cursor-pointer text-edgeOrange"
                      onClick={() => {
                        // navigate("/setting/profile");
                      }}
                    >
                      프로필
                    </p>
                  </li>
                </ul>
                <div className="flex justify-end border-solid  border-gray-300 px-5 py-2">
                  <button className="edge-btn edge-btn-orange">
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
