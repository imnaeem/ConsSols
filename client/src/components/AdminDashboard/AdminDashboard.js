import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "../EditProfile/Profile";
import Messages from "./Messages/Messages";
import Promotions from "./Promotions/Promotions";

import Verifications from "./Verifications/Verifications";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import Links from "./MenuLinks";

const AdminDashboard = () => {
  return (
    <>
      <Box
        sx={{
          background: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            margin: {
              xs: "0px",
              lg: "0px 45px",
            },
            padding: {
              xs: "20px",
              lg: "30px 15px",
            },
          }}
        >
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            justifyContent="space-around"
            spacing={3}
            alignItems="flex-start"
          >
            <LeftSidebar links={Links} />
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="verifications" element={<Verifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile type="admin" />} />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
