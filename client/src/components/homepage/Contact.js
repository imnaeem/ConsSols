import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <Box
      sx={{
        background: "#3a7af3",
      }}
    >
      <Box
        sx={{
          background:
            " url(https://assets.goodfirms.co/categories/home-bottom-building.svg) 0 0 repeat-x",
          paddingRight: "15px",
          paddingLeft: "15px",
          margin: {
            xs: "0px",
            lg: "0px 40px",
          },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          spacing={{ xs: 1.5, lg: 0 }}
          justifyContent={{
            xs: "center",
            lg: "space-between",
          }}
          alignItems="center"
          sx={{
            height: "133px",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "25px",
                lg: "40px",
              },
              color: "white",
              fontWeight: "bold",
            }}
          >
            Got a Question? Ask Away!
          </Typography>

          <Button
            component={Link}
            to="/contact-us"
            variant="contained"
            color="secondary"
            endIcon={<ArrowRightAltIcon />}
            sx={{
              padding: "10px 20px",
              background: "#ffc600",
              borderRadius: "7px",
              color: "black",
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
