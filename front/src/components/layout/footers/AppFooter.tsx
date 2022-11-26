import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Telegram } from "@mui/icons-material";

export default function AppFooter() {
  const [value, setValue] = React.useState(0);

  return (
    <footer className="flex justify-center py-4">
      <div className=" flex  justify-center items-center text-xs px-4">© Copyright 2022 jdwns96. All rights reserved.</div>
    </footer>
  );
}
