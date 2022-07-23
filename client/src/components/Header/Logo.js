import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Logo = () => {
  return (
    <Box
      sx={{
        textAlign: { xs: "center", md: "left" },
        width: "205px",
      }}
    >
      <Box component={Link} to="/">
        <Box
          component="img"
          sx={{
            width: { xs: "150px", lg: "180px" },
          }}
          alt="logo"
          src={logo}
        />
      </Box>
    </Box>
  );
};

export default Logo;
