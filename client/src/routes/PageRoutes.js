import { React, useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import {
  ProtectedRoutes,
  AuthRoutes,
  CompaniesProjects,
} from "./protectedRoutes";

// Lazy load components for code splitting
const Companies = lazy(() => import("../components/FindCompanies/Companies"));
const Company = lazy(() => import("../components/Company/Company"));
const Homepage = lazy(() => import("../components/homepage/Homepage"));
const SignIn = lazy(() => import("../components/Auth/SignIn"));
const SignUp = lazy(() => import("../components/Auth/SignUp"));
const ForgetPassword = lazy(() => import("../components/Auth/ForgetPassword"));
const CompanyDashboard = lazy(() => import("../components/CompanyDashboard/CompanyDashboard"));
const ClientDashboard = lazy(() => import("../components/ClientDashboard/ClientDashboard"));
const FindProjects = lazy(() => import("../components/FindProjects/FindProjects"));
const AboutUs = lazy(() => import("../components/StaticPages/AboutUs"));
const ContactUs = lazy(() => import("../components/StaticPages/ContactUs"));
const Faqs = lazy(() => import("../components/StaticPages/Faqs"));
const PrivacyPolicy = lazy(() => import("../components/StaticPages/PrivacyPolicy"));
const AdminDashboard = lazy(() => import("../components/AdminDashboard/AdminDashboard"));
const PageNotFound = lazy(() => import("../components/PageNotFound"));

// Loading component for suspense
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
    <CircularProgress />
  </Box>
);

const PageRoutes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/company-profile/:id" element={<Company />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/page-not-found" element={<PageNotFound />} />

        <Route
          path="/find-companies"
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

        <Route component={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
