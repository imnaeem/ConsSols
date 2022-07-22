import React from "react";
import { Stack } from "@mui/material";
import RightSidebar from "./RightSidebar";
import EditProfile from "./EditProfile";

const Profile = () => {
  return (
    <>
      <Stack
        direction="column"
        flex={2.3}
        spacing={3}
        sx={{ maxWidth: { xl: "750px", lg: "750px" }, width: "100%" }}
      >
        <EditProfile />
      </Stack>

      <RightSidebar />
    </>
  );
};

export default Profile;
