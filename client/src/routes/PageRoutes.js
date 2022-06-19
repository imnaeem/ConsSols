import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Companies from "../components/FindCompanies/Companies";
import Company from "../components/Company/Company";
import Homepage from "../components/homepage/Homepage";

import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgetPassword from "../components/Auth/ForgetPassword";
import CompanyDashboard from "../components/CompanyDashboard/CompanyDashboard";

import ClientDashboard from "../components/ClientDashboard/ClientDashboard";

import FindProjects from "../components/FindProjects/FindProjects";
import {
  ProtectedRoutes,
  AuthRoutes,
  CompaniesProjects,
} from "./protectedRoutes";
import AboutUs from "./../components/StaticPages/AboutUs";
import ContactUs from "./../components/StaticPages/ContactUs";
import Faqs from "./../components/StaticPages/Faqs";
import PrivacyPolicy from "./../components/StaticPages/PrivacyPolicy";
import AdminDashboard from "./../components/AdminDashboard/AdminDashboard";
import PageNotFound from "./../components/PageNotFound";

const PageRoutes = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    //const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/company-profile/:id" element={<Company />} />
      {/* <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signup" element={<SignUp />} /> */}
      {/* <Route path="/find-projects" element={<FindProjects />} />
      <Route path="/find-companies" element={<Companies />} /> */}
      {/* <Route path="/user/forget-password" element={<ForgetPassword />} /> */}
      {/* <Route path="/company/*" element={<CompanyDashboard />} />
      <Route path="/client/*" element={<ClientDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/client/:id/proposals" element={<ProjectProposal />} /> */}

      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/page-not-found" element={<PageNotFound />} />

      <Route
        path="/find-companiess"
        element={
          <CompaniesProjects page="companies" loggedIn={user}>
            <Companies />
          </CompaniesProjects>
        }
      />

      <Route
        path="/find-projects"
        element={
          <CompaniesProjects page="projects" loggedIn={user}>
            <FindProjects />
          </CompaniesProjects>
        }
      />

      <Route
        path="/user/signin"
        element={
          <AuthRoutes page="signin" loggedIn={user}>
            <SignIn />
          </AuthRoutes>
        }
      />

      <Route
        path="/user/signup"
        element={
          <AuthRoutes page="signup" loggedIn={user}>
            <SignUp />
          </AuthRoutes>
        }
      />

      <Route
        path="/user/forget-password"
        element={
          <AuthRoutes page="signup" loggedIn={user}>
            <ForgetPassword />
          </AuthRoutes>
        }
      />

      <Route
        path="/company/*"
        element={
          <ProtectedRoutes type="company" loggedIn={user}>
            <CompanyDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/client/*"
        element={
          <ProtectedRoutes type="client" loggedIn={user}>
            <ClientDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoutes type="admin" loggedIn={user}>
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
