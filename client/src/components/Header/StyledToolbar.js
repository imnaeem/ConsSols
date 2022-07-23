import React from "react";
import { Toolbar } from "@mui/material";

const StyledToolbar = ({ children }) => {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: {
          xs: "0px 13px 0px 3px",
          md: "0px 13px 0px 13px",
          lg: "0 40px",
        },
        padding: { xs: "0px" },
        height: { xs: "60px", lg: "80px" },
      }}
    >
      {children}
    </Toolbar>
  );
};

export default StyledToolbar;
