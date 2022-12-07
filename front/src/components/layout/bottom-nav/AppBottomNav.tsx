import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home, Person, Search, Telegram } from "@mui/icons-material";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const BOTTOM_NAV = { width: "100%", backgroundColor: "inherit", ".Mui-selected": { color: "#61DAFB" } };
const BOTTOM_NAV_ITEMS = { color: "inherit", ".Mui-selected": { color: "#61DAFB" } };

export default function AppBottomNav() {
  // const params = useParams();  // param === :param
  const location = useLocation(); // total path information
  const navigate = useNavigate(); // navigate to a new path

  const [path, setPath] = React.useState(location.pathname);

  React.useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // console.log(newValue);
    setPath(location.pathname);
    navigate(newValue);
  };

  return (
    <nav className="fixed left-0 right-0 bottom-0 justify-center flex md:hidden z-10 shadow-xl bg-white dark:bg-[#20232A] snack-border-t">
      <BottomNavigation value={path} onChange={handleChange} sx={BOTTOM_NAV}>
        <BottomNavigationAction label="Home" value="/" icon={<Home style={{ color: "inherit" }} />} sx={BOTTOM_NAV_ITEMS} />
        <BottomNavigationAction label="Search" value="/search" icon={<Search />} sx={BOTTOM_NAV_ITEMS} />
        <BottomNavigationAction label="Chat" value="/chat" icon={<Telegram />} sx={BOTTOM_NAV_ITEMS} />
        {/* <BottomNavigationAction label="User" value="folder" icon={<Person />} sx={BOTTOM_NAV_ITEMS} /> */}
      </BottomNavigation>
    </nav>
  );
}
