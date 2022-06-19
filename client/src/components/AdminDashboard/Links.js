import HomeIcon from "@mui/icons-material/Home";
import ServicesIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import CampaignIcon from "@mui/icons-material/Campaign";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Links = [
  {
    url: "/admin/dashboard",
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    url: "/admin/promotions",
    text: "Promotions",
    icon: <CampaignIcon />,
  },

  {
    url: "/admin/messages",
    text: "Messages",
    icon: <ChatIcon />,
  },
  {
    url: "/admin/verifications",
    text: "Company Verifications",
    icon: <VerifiedUserIcon />,
  },
  {
    url: "/admin/profile",
    text: "Edit Profile",
    icon: <ServicesIcon />,
  },
];

export default Links;
