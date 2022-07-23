import { React } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const MenuLink = (props) => {
  const { url, text, setIsDrawerOpen } = props;
  const location = useLocation();
  const hightlight = url === location.pathname;

  return (
    <ListItem disablePadding sx={{ ":hover": { color: "#3a7af3" } }}>
      <ListItemButton
        selected={hightlight}
        sx={{ padding: { xs: "9px", md: "6px 8px" }, borderRadius: "5px" }}
        component={Link}
        to={url}
        onClick={() => {
          if (setIsDrawerOpen) {
            setIsDrawerOpen(false);
          }
        }}
      >
        <ListItemText
          disableTypography
          primary={text}
          sx={{
            color: hightlight ? "#3a7af3" : "#333",
            fontSize: "16px",
            fontWeight: "600",
            margin: "0px",
            width: "max-content",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuLink;
