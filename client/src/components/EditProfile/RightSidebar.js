import React from "react";
import { Box, Paper, Typography, Stack, Divider, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RightSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
    //navigate("/");
  };
  return (
    <Stack sx={{ width: "100%" }} direction="column" flex={1}>
      <Stack direction="column" spacing={2}>
        <Paper elevation={2}>
          <Typography
            sx={{
              padding: "15px 20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Logout
          </Typography>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={logout}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RightSidebar;
