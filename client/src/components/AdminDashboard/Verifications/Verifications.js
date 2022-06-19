import React from "react";
import { Box, Stack, Paper, Typography, Button, Divider } from "@mui/material";
import LeftSidebar from "../LeftSidebar";
import ComingSoon from "../../../images/coming-soon.jpg";
import { Helmet } from "react-helmet";

const Verifications = () => {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
      <Helmet>
        <title>Companies Verifications</title>
      </Helmet>
      <Box
        sx={{
          margin: "0px 45px",
          padding: "30px 15px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={3}
          alignItems="flex-start"
        >
          <LeftSidebar />

          <Stack flex={1}>
            <Paper>
              <Box
                sx={{
                  padding: "15px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Verifications
                </Typography>
              </Box>

              <Divider orientation="horizontal" flexItem />
              <Box
                sx={{
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  src={ComingSoon}
                  sx={{
                    maxHeight: "400px",
                    maxWidth: "400px",
                    verticalAlign: "middle",
                  }}
                />
              </Box>
            </Paper>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Verifications;
