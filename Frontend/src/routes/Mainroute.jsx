import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../routes/Protectedpoute";
import OnboardingForm from "../components/OnBoardingForm";
import Dashboard from "../components/DashBoard";

const Mainroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route
        path="/onboardingform"
        element={
          <ProtectedRoute>
            <OnboardingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Mainroute;
