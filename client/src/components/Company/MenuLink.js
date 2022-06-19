import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

const MenuLink = (props) => {
  const scrollToId = () => {
    const currentBox = document.getElementById(props.url.replace("#", ""));
    window.scrollTo({
      top: currentBox.offsetTop - 111,
      behavior: "smooth",
    });
  };
  return (
    <ListItem disablePadding sx={{ ":hover": { color: "#3a7af3" } }}>
      <ListItemButton sx={{ padding: "9px" }} onClick={scrollToId}>
        <ListItemIcon
          sx={{
            minWidth: "40px",
          }}
        >
          {props.icon}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={props.text}
          sx={{
            fontSize: "19px",
            fontWeight: "bold",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuLink;
