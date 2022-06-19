import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./EditProfile/Profile";
import Messages from "./Messages/Messages";
import Promotions from "./Promotions/Promotions";

import Verifications from "./Verifications/Verifications";

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="promotions" element={<Promotions />} />
      <Route path="verifications" element={<Verifications />} />
      <Route path="messages" element={<Messages />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default AdminDashboard;
