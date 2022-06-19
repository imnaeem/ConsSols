import { Box, Typography, Divider } from "@mui/material";
import React from "react";

const Details = () => {
  return (
    <Box>
      <Box
        sx={{
          margin: "0px 60px",
          padding: "40px 0px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            padding: "0 0 12px",
            fontSize: "32px",
            lineHeight: "1.3",
            color: "#333",
          }}
        >
          Top Drupal Development Companies
        </Typography>
        <Typography>
          Are you looking for top Construction Companies? Here is the list to
          find your company according to your needs that provides excellent
          construction services to clients. ConSols is the best of all platforms
          that provide verity of companies to develop your projects ranging from
          single house to larger farm houses. There are large numbers of
          builders that claim to provide excellent construction services. To
          help these service seekers cut through the clutter and find the best
          company, ConsSols have listed top construction companies. These top
          performers are verified through our verification process real and
          authorized companies having good repute in the market. Find and hire
          the best builder from the below list:
        </Typography>
      </Box>
      <Divider orientation="horizontal" flexItem />
    </Box>
  );
};

export default Details;
