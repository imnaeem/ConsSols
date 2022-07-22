import React from "react";
import { Box, Stack, Paper, Typography, Divider } from "@mui/material";
import ComingSoon from "../../../images/coming-soon.jpg";
import { Helmet } from "react-helmet";

const Verifications = () => {
  return (
    <Stack sx={{ width: "100%" }} flex={1}>
      <Helmet>
        <title>Companies Verifications</title>
      </Helmet>
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
              width: "100%",
              maxHeight: "400px",
              maxWidth: "400px",
              verticalAlign: "middle",
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default Verifications;
