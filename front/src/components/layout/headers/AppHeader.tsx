import { EggAlt, MenuBook } from "@mui/icons-material";
import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function AppHeader() {
  return (
    <header>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <EggAlt />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            SNACK
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
