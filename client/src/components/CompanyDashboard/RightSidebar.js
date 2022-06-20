import React from "react";
import { Box, Paper, Typography, Stack, Divider, Button } from "@mui/material";

const RightSidebar = () => {
  return (
    <Stack direction="column" flex={1}>
      <Stack direction="column" spacing={2}>
        <Paper elevation={2}>
          <Typography
            sx={{
              padding: "15px 20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            What's New
          </Typography>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              padding: "10px 20px",
            }}
          >
            <Box sx={{ display: "inline" }}>
              <Typography>
                ConsSols is a full-fledged companies and review platform that
                helps companies and clients seekers to get help with projects.
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper elevation={2}>
          <Typography
            sx={{
              padding: "15px 20px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Company Verification
          </Typography>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              padding: "10px 20px",
            }}
          >
            <Typography>
              You have to submit your ID card and legal document of the compnay
              to get listed
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                margin: "10px 0px",
              }}
            >
              Coming Soon
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RightSidebar;
