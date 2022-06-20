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
          Register with ConsSols account
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
              Get Started on ConsSols:
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              For any business, conversion is everything. In this tech world, to
              increase conversion it is of paramount importance for any
              company/business to have a good online reputation. ConsSols
              provides companies & construction service seekers a platform to
              manage and improve their online credibility and reputation.
            </Typography>
            <Typography sx={{ padding: "10px 0px" }}>
              Add your company to ConsSols to boost reputation which in turn
              will increase online exposure, gain online attention and grab more
              audience! Take the actionable profit-driven first step by filling
              the form given here.
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
