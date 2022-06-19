import HomeIcon from "@mui/icons-material/Home";
import ServicesIcon from "@mui/icons-material/Settings";
import PortfolioIcon from "@mui/icons-material/Work";
import ReviewsIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

const Links = [
  {
    url: "/company/dashboard",
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    url: "/company/edit-company",
    text: "Company",
    icon: <BusinessIcon />,
  },
  {
    url: "/company/portfolio",
    text: "Portfolio",
    icon: <PortfolioIcon />,
  },
  {
    url: "/company/proposals",
    text: "My Proposals",
    icon: <ListAltIcon />,
  },
  {
    url: "/company/reviews",
    text: "Reviews",
    icon: <ReviewsIcon />,
  },
  {
    url: "/company/promotions",
    text: "Promote Company",
    icon: <ElectricBoltIcon />,
  },
  {
    url: "/company/profile",
    text: "Edit Profile",
    icon: <ServicesIcon />,
  },
];

export default Links;
