import React from "react";
import { List, Box, Divider } from "@mui/material";
import MenuLink from "./MenuLink";
import DrawerLinks from "./DrawerLinks";

const MobileMenu = ({ setIsDrawerOpen }) => {
  return (
    <List sx={{ padding: "10px", width: "100%" }}>
      {DrawerLinks.map((link, index) => (
        <Box key={index}>
          <MenuLink
            url={link.url}
            text={link.text}
            setIsDrawerOpen={setIsDrawerOpen}
          />
          {link.text === "Find Projects" && (
            <Divider sx={{ margin: "5px 0px" }} />
          )}
        </Box>
      ))}
    </List>
  );
};

export default MobileMenu;
