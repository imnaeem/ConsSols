import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import logo from "../../images/logo.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Info = () => {
  return (
    <Stack direction="column">
      <Box
        component="img"
        sx={{
          width: "200px",
          marginBottom: "20px",
        }}
        alt="logo"
        src={logo}
      />
      <Box
        sx={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        <LocationOnIcon
          sx={{
            marginRight: "10px",
            color: "#ffc600",
          }}
        />
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "Bold",
          }}
        >
          Lahore
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#757982",
            lineHeight: "24px",
            fontSize: "16px",
          }}
        >
          Punjab University College of Information Technology
        </Typography>
        <Typography
          sx={{
            color: "#757982",
            lineHeight: "24px",
            fontSize: "18px",
          }}
        >
          Lahore, Pakistan
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <LinkedInIcon />
        <FacebookIcon />
        <TwitterIcon />
      </Box>
    </Stack>
  );
};

export default Info;
