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
                GoodFirms is a full-fledged research and review platform that
                helps software buyers and service seekers to
                <Box
                  component="a"
                  href="#"
                  sx={{
                    display: "inline",
                    textDecoration: "none",
                    marginLeft: "5px",
                  }}
                >
                  read more...
                </Box>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RightSidebar;
