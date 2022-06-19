import { React, useLayoutEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./EditProfile/Profile";
import Portfolio from "./Portfolio/Portfolios";
import Proposals from "./Proposals/Proposals";
import Reviews from "./Reviews/Reviews";
import EditCompany from "./EditCompany/EditCompany";
import Promotions from "./Promotions/Promotions";
import AddPortfolio from "./Portfolio/AddPortfolio/AddPortfolio";
import NewPromotion from "./Promotions/NewPromotion/NewPromotion";

const CompanyDashboard = () => {
  return (
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
  );
};

export default CompanyDashboard;
