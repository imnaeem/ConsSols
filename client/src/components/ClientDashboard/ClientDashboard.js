import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "../EditProfile/Profile";
import Projects from "./Projects/Projects";
import Reviews from "./Reviews/Reviews";
import AddProject from "./Projects/AddProjects/AddProject";
import LeaveReview from "./Reviews/LeaveReview/LeaveReview";
import ViewAllReviws from "./Reviews/ViewAllReviws/ViewAllReviws";

import ProjectProposal from "./Projects/ProjectProposals/ProjectProposals";

import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import Links from "./MenuLinks";
import LeftSidebar from "./../LeftSidebar/LeftSidebar";

const CompanyDashboard = () => {
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
              <Route path="projects" element={<Projects />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="profile" element={<Profile type="client" />} />
              <Route path="add-project" element={<AddProject />} />
              <Route path="leave-review" element={<LeaveReview />} />
              <Route path="view-all-reviews" element={<ViewAllReviws />} />
              <Route path=":id/proposals" element={<ProjectProposal />} />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CompanyDashboard;
