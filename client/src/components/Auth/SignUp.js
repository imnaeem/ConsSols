import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import SignUpForm from "./SignUpForm";
import { Helmet } from "react-helmet";

const Signup = () => {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Box
        sx={{
          padding: { xs: "40px", sm: "40px 60px" },
        }}
      >
        <Typography
          sx={{
            color: "#181818",
            fontSize: "30px",
            lineHeight: "2.12rem",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Register with GoodFirms account
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0, md: 3 }}
        >
          <Box
            flex={1.2}
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#181818",
                fontWeight: "700",
              }}
            >
              Get Started on GoodFirms:
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              For any business, conversion is everything. In the cutthroat
              world, to increase conversion it is of paramount importance for
              any business to have a good online reputation. GoodFirms provides
              IT companies & software vendors a platform to manage and improve
              their online credibility and reputation.
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              Add your business to GoodFirms to boost reputation which in turn
              will increase online exposure, drive traffic and explode revenues!
              Take the actionable profit-driven first step by filling the form
              given here.
            </Typography>
            <Box
              component="img"
              sx={{
                zIndex: "1",
                maxWidth: "100%",
              }}
              alt="Signup"
              src="https://www.goodfirms.co/img/signupbg.jpg"
            />
          </Box>

          <SignUpForm />
        </Stack>
      </Box>
    </Box>
  );
};

export default Signup;
