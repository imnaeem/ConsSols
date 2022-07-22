import HomeIcon from "@mui/icons-material/Home";
import ServicesIcon from "@mui/icons-material/Settings";
import ReviewsIcon from "@mui/icons-material/Star";
import ListAltIcon from "@mui/icons-material/ListAlt";

const Links = [
  {
    url: "/client/dashboard",
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    url: "/client/projects",
    text: "Projects",
    icon: <ListAltIcon />,
  },
  {
    url: "/client/reviews",
    text: "Reviews",
    icon: <ReviewsIcon />,
  },
  {
    url: "/client/profile",
    text: "Edit Profile",
    icon: <ServicesIcon />,
  },
];

export default Links;
