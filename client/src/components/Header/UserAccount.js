import { React, useState } from "react";
import {
  Stack,
  Tooltip,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {} from "react-router-dom";

const UserAccount = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
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
              display: { xs: "none", md: "block" },
            }}
          >
            Sign Up
          </Button>
        </Stack>
      )}

      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Dashboard">
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
            <MenuItem
              sx={{ padding: "0px" }}
              onClick={() => {
                navigate(`/${user.result.type}/dashboard`);
                handleCloseUserMenu();
              }}
            >
              <Typography
                sx={{ padding: "6px 16px", width: "100%" }}
                id="dashboard"
              >
                Dashboard
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{ padding: "0px" }}
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                window.location.replace("/");
                handleCloseUserMenu();
              }}
            >
              <Typography
                sx={{ padding: "6px 16px", width: "100%" }}
                id="logout"
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Stack>
  );
};

export default UserAccount;
