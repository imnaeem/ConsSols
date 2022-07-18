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
        sx={{ padding: "9px" }}
        component={Link}
        to={url}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      >
        <ListItemText
          disableTypography
          primary={text}
          sx={{
            color: hightlight ? "#3a7af3" : "#333",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuLink;
