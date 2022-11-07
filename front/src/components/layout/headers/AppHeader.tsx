import { EggAlt, MenuBook } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function AppHeader() {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense" className="flex justify-between">
          <div className="flex">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <EggAlt />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" className="flex items-center">
              SNACK
            </Typography>
          </div>
          <ul className="flex">
            <li className="h-full">1</li>
            <li className="h-full">1</li>
          </ul>
        </Toolbar>
      </AppBar>
    </>
  );
}
