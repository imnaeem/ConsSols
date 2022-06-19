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
          Are you looking for top Drupal development companies? Here is the list
          of top Drupal developers that provides excellent Drupal development
          services to clients. Drupal is a powerful CMS widely used to develop
          variety of web solutions; ranging from a single page website to
          complex eCommerce stores. There are large numbers of web development
          companies in tech world that claim to provide excellent Drupal
          development services. To help Drupal service seekers cut through the
          clutter and find the best Drupal web partner, GoodFirms have listed
          top Drupal development companies. These top performers are vouched in
          web industry for delivering robust and innovative Drupal development
          solutions. Find and hire the best Drupal developer from the below
          list:
        </Typography>
      </Box>
      <Divider orientation="horizontal" flexItem />
    </Box>
  );
};

export default Details;
