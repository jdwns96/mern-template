import React from "react";
import { EggAlt, Home, MenuBook, Person, Search } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0">
      <AppBar position="static">
        <Toolbar variant="dense" className="flex justify-between">
          <div className="flex text-snack-gold cursor-pointer">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <EggAlt />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" className="flex items-center">
              SNACK
            </Typography>
          </div>
          <ul className="flex">
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all snack-after-bar">
              <Home />
            </li>
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all snack-after-bar">
              <Search />
            </li>
            <li className="relative p-2 px-3 cursor-pointer hover:text-snack-gold transition-all">
              <Person />
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </header>
  );
}
