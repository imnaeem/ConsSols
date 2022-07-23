import { React, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AppBar, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "./Menu/Menu";
import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import UserAccount from "./UserAccount";
import StyledToolbar from "./StyledToolbar";

const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  zIndex: theme.zIndex.drawer + 1,
}));

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <HeaderBar position="sticky" variant="outlined" elevation={0}>
        <StyledToolbar>
          {!matches && <MobileDrawer user={user ? user : null} />}
          <Logo />
          {matches && (
            <Box flex={5}>
              <Menu userType={user ? user.result.type : null} />
            </Box>
          )}
          <UserAccount user={user ? user : null} />
        </StyledToolbar>
      </HeaderBar>
      <Box id="back-to-top" />
    </>
  );
};

export default Header;
