import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./EditProfile/Profile";
import Projects from "./Projects/Projects";
import Reviews from "./Reviews/Reviews";
import AddProject from "./Projects/AddProjects/AddProject";
import LeaveReview from "./Reviews/LeaveReview/LeaveReview";
import ViewAllReviws from "./Reviews/ViewAllReviws/ViewAllReviws";

import ProjectProposal from "./Projects/ProjectProposals/ProjectProposals";

const CompanyDashboard = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="profile" element={<Profile />} />
      <Route path="add-project" element={<AddProject />} />
      <Route path="leave-review" element={<LeaveReview />} />
      <Route path="view-all-reviews" element={<ViewAllReviws />} />
      <Route path=":id/proposals" element={<ProjectProposal />} />
    </Routes>
  );
};

export default CompanyDashboard;
