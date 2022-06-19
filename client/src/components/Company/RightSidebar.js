import React from "react";
import { Box, Paper, Typography, Stack, Divider, Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

const RightSidebar = ({ phone, address }) => {
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
            Contact Information
          </Typography>

          <Divider orientation="horizontal" flexItem />

          <Box
            sx={{
              padding: "15px 20px",
            }}
          >
            <Box>
              <Typography>{address.streetAddress}</Typography>
              <Typography>{address.city + " " + address.state}</Typography>
              <Typography>{address.country}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <CallIcon
                sx={{
                  marginRight: "5px",
                }}
              />
              <Typography>{"+" + phone}</Typography>
            </Box>
            <Button fullWidth variant="contained">
              Chat
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default RightSidebar;
