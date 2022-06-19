import React from "react";
import { Grow, Box, Paper } from "@mui/material";
import NotFoundImage from "../images/404.png";
import Contact from "./homepage/Contact";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <Box>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Grow in>
        <Paper
          elevation={2}
          sx={{
            padding: "30px",
            margin: "30px 60px",
            textAlign: "center",
          }}
        >
          <Box component="img" src={NotFoundImage} />
        </Paper>
      </Grow>
      <Contact />
    </Box>
  );
};

export default PageNotFound;
