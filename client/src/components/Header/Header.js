import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  Tooltip,
  ListItemButton,
  Menu,
  MenuItem,
  // CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../images/logo.png";
import { React, useState, useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
//import { MenuItem } from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import MobileMenu from "./MobileMenu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  zIndex: theme.zIndex.drawer + 1,
}));

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    //const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useLayoutEffect(() => {
    const user = localStorage.getItem("profile");
    //console.log(JSON.parse(user));
    if (user) {
      setIsLoggedIn(JSON.parse(user));
    }
  }, []);

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    window.location.replace("/");
    //navigate("/", { replace: true });
  };

  let dashboardLink = "#";

  if (user) {
    if (user.result.type === "company") {
      dashboardLink = "/company/dashboard";
    } else if (user.result.type === "client") {
      dashboardLink = "/client/dashboard";
    } else {
      dashboardLink = "/admin/dashboard";
    }
  }

  const menuItemClick = (event) => {
    //console.log(event.target.getAttribute("id"));
    handleCloseUserMenu();
    if (event.target.getAttribute("id") === "logout") {
      logout();
    }
    if (event.target.getAttribute("id") === "dashboard") {
      navigate(dashboardLink);
    }
  };

  return (
    <HeaderBar position="sticky" variant="outlined" elevation={0}>
      <StyledToolbar
        sx={{
          margin: { xs: "0px 13px 0px 3px", sm: "0 40px" },
          padding: { xs: "0px" },
          height: { xs: "60px", lg: "80px" },
        }}
      >
        <IconButton
          onClick={() => {
            setIsDrawerOpen((prevState) => !prevState);
          }}
          sx={{
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          }}
        >
          <MenuIcon />
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
            <MobileMenu setIsDrawerOpen={setIsDrawerOpen} />
          </Box>
        </Drawer>

        <Box
          flex={0.9}
          component={Link}
          to="/"
          sx={{
            minWidth: "205px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#1976d2",
            textDecoration: "none",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box
            component="img"
            sx={{
              width: { xs: "150px", lg: "180px" },
            }}
            alt="logo"
            src={logo}
          />
        </Box>
        <Box
          flex={5}
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          <Stack direction="row" spacing={3}>
            {(!user || user.result.type === "admin") && (
              <ListItemButton
                selected={location.pathname === "/find-companies"}
                sx={{
                  color:
                    location.pathname === "/find-companies"
                      ? "#3a7af3"
                      : "#333",
                  fontWeight: "600",
                  maxWidth: "fit-content",
                  borderRadius: "5px",
                  padding: "6px 8px",
                }}
                variant="text"
                component={Link}
                to="/find-companies"
              >
                Find Companies
              </ListItemButton>
            )}
            {(!user || user.result.type === "admin") && (
              <ListItemButton
                selected={location.pathname === "/find-projects"}
                sx={{
                  color:
                    location.pathname === "/find-projects" ? "#3a7af3" : "#333",
                  fontWeight: "600",
                  maxWidth: "fit-content",
                  borderRadius: "5px",
                  padding: "6px 8px",
                }}
                variant="text"
                component={Link}
                to="/find-projects"
              >
                Find Projects
              </ListItemButton>
            )}
            {user && user.result.type === "client" && (
              <ListItemButton
                selected={location.pathname === "/find-companies"}
                sx={{
                  color:
                    location.pathname === "/find-companies"
                      ? "#3a7af3"
                      : "#333",
                  fontWeight: "600",
                  maxWidth: "fit-content",
                  borderRadius: "5px",
                  padding: "6px 8px",
                }}
                variant="text"
                component={Link}
                to="/find-companies"
              >
                Find Companies
              </ListItemButton>
            )}

            {user && user.result.type === "company" && (
              <ListItemButton
                selected={location.pathname === "/find-projects"}
                sx={{
                  color:
                    location.pathname === "/find-projects" ? "#3a7af3" : "#333",
                  fontWeight: "600",
                  maxWidth: "fit-content",
                  borderRadius: "5px",
                  padding: "6px 8px",
                }}
                variant="text"
                component={Link}
                to="/find-projects"
              >
                Find Projects
              </ListItemButton>
            )}

            <ListItemButton
              selected={location.pathname === "/about-us"}
              sx={{
                color: location.pathname === "/about-us" ? "#3a7af3" : "#333",
                fontWeight: "600",
                maxWidth: "fit-content",
                borderRadius: "5px",
                padding: "6px 8px",
              }}
              variant="text"
              component={Link}
              to="/about-us"
            >
              Why ConsSols
            </ListItemButton>
          </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
          {!user && (
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" component={Link} to="/user/signin">
                Login
              </Button>
              <Button
                component={Link}
                to="/user/signup"
                variant="outlined"
                sx={{
                  [theme.breakpoints.down("lg")]: {
                    display: "none",
                  },
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="user image"
                    src={
                      JSON.parse(localStorage.getItem("profile"))
                        ? JSON.parse(localStorage.getItem("profile")).result
                            .userImage
                        : ""
                    }
                  >
                    {user.result.firstName.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                disableScrollLock={true}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={menuItemClick}>
                  <Typography
                    sx={{ textDecoration: "none" }}
                    textAlign="center"
                    id="dashboard"
                  >
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem onClick={menuItemClick}>
                  <Typography
                    sx={{ textDecoration: "none" }}
                    textAlign="center"
                    id="logout"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Stack>
      </StyledToolbar>
    </HeaderBar>
  );
};

export default Header;
