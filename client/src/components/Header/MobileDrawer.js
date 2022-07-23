import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, IconButton, Drawer } from "@mui/material";
import Menu from "./Menu/Menu";
import StyledToolbar from "./StyledToolbar";

const MobileDrawer = ({ user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box>
      <IconButton
        onClick={() => {
          setIsDrawerOpen((prevState) => !prevState);
        }}
      >
        {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        sx={{
          width: "270px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "270px",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        <StyledToolbar />
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            setIsDrawerOpen={setIsDrawerOpen}
            userType={user ? user.result.type : null}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
