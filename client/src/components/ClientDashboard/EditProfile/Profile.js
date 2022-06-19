import React from "react";
import { Box, Stack } from "@mui/material";
import LeftSidebar from "../LeftSidebar";
import RightSidebar from "./RightSidebar";
import EditProfile from "./EditProfile";

const Profile = () => {
  return (
    <Box
      sx={{
        background: "#f5f5f5",
      }}
    >
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

          <Stack
            direction="column"
            flex={2.3}
            spacing={3}
            sx={{ maxWidth: { xl: "750px", lg: "750px" } }}
          >
            <EditProfile />
          </Stack>

          <RightSidebar />
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
