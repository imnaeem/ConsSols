import React from "react";
import { List, Paper } from "@mui/material";
import MenuLink from "./MenuLink";
import Links from "./Links";

const LeftSidebar = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: " 10px",
        minWidth: "315px",
        position: "sticky",
        top: "111px",
      }}
    >
      <List sx={{ padding: "0px" }}>
        {Links.map((link, index) => (
          <MenuLink
            key={index}
            url={link.url}
            text={link.text}
            icon={link.icon}
          />
        ))}
      </List>
    </Paper>
  );
};

export default LeftSidebar;
