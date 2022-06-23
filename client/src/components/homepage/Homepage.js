import React from "react";
import Banner from "./Banner";
import Review from "./Review";
import WriteReview from "./WriteReview";
import Process from "./Process";
import Contact from "./Contact";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <Box>
      <Helmet>
        <title>Construction Services Marketplace</title>
      </Helmet>
      <Banner />
      <WriteReview />
      <Process />
      <Contact />
    </Box>
  );
};

export default Homepage;
