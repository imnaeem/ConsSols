import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "../EditProfile/Profile";
import Portfolio from "./Portfolio/Portfolios";
import Proposals from "./Proposals/Proposals";
import Reviews from "./Reviews/Reviews";
import EditCompany from "./EditCompany/EditCompany";
import Promotions from "./Promotions/Promotions";
import AddPortfolio from "./Portfolio/AddPortfolio/AddPortfolio";
import NewPromotion from "./Promotions/NewPromotion/NewPromotion";
import { Box, Stack } from "@mui/material";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import Links from "./MenuLinks";

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
              <Route path="edit-company" element={<EditCompany />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="proposals" element={<Proposals />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="new-promotion" element={<NewPromotion />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add-portfolio" element={<AddPortfolio />} />
            </Routes>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default CompanyDashboard;
