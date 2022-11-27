import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home, Person, Search, Telegram } from "@mui/icons-material";

const BOTTOM_NAV = { width: "100%", backgroundColor: "#F8F9F9", ".Mui-selected": { color: "#AB825F" } };
const BOTTOM_NAV_ITEMS = { color: "#AB825F" };

export default function AppBottomNav() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <nav className="fixed left-0 right-0 bottom-0 justify-center flex md:hidden z-10 shadow-lg">
      <BottomNavigation value={value} onChange={handleChange} sx={BOTTOM_NAV}>
        <BottomNavigationAction label="Home" value="recents" icon={<Home />} sx={BOTTOM_NAV_ITEMS} />
        <BottomNavigationAction label="Find" value="favorites" icon={<Search />} sx={BOTTOM_NAV_ITEMS} />
        <BottomNavigationAction label="Chat" value="nearby" icon={<Telegram />} sx={BOTTOM_NAV_ITEMS} />
        {/* <BottomNavigationAction label="User" value="folder" icon={<Person />} sx={BOTTOM_NAV_ITEMS} /> */}
      </BottomNavigation>
    </nav>
  );
}
