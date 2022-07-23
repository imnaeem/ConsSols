import React from "react";
import { Box, Typography } from "@mui/material";
import { Stack, Divider } from "@mui/material";
import Info from "./Info";
import LinksSection from "./LinksSection";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "50px 0px 20px 0px",
      }}
    >
      <Box
        sx={{
          margin: { xs: "0px 40px", sm: "0px 60px" },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
        >
          <Box flex={1.5} mx={{ minWidth: "230px" }}>
            <Info />
          </Box>

          <Divider
            orientation="horizontal"
            variant="middle"
            flexItem
            sx={{
              display: { xs: "block", lg: "none" },
              margin: {
                xs: "20px",
                lg: "40px",
              },
            }}
          />

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              display: { xs: "none", lg: "block" },
              margin: "40px 95px 20px 95px",
            }}
          />

          <Stack
            direction={{
              md: "row",
              xs: "column",
            }}
            spacing={{
              xs: 0,
              md: 4,
            }}
            flex={5}
            justifyContent="space-around"
          >
            <LinksSection section="Explore" />
            <LinksSection section="For Companies" />
            <LinksSection section="Overview" />
          </Stack>
        </Stack>

        <Divider
          orientation="horizontal"
          flexItem
          sx={{
            margin: {
              xs: "15px 0px 15px 0px",
              lg: "35px 0px 15px 0px",
            },
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          Copyright © ConsSols 2022
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
