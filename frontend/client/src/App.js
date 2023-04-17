import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./containers/user/LandingPage";
import LoginPage from "./containers/user/LoginPage";
import RegisterPage from "./containers/user/RegisterPage";
import "./style.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import GeneratePage from "./containers/user/HomeDashboard";
import AdminLogin from "./containers/admin/AdminLogin";
import AdminPage from "./containers/admin/AdminPage";
import Users from "./containers/admin/User";
import Dashboard from "./containers/admin/Dashboard";
import HomeDashboard from "./containers/user/HomeDashboard";
import GenerationPage from "./containers/user/GenerationPage";
import { BlogGenerator, checkAuth } from "./features/user";
import BlogGeneratorPage from "./containers/user/BlogGenerate";
import StoryGenerator from "./containers/user/StoryGenerator";
import ContentView from "./containers/user/ContentView";
import StoryGeneratorPage from "./containers/user/StoryGenerator";
import "primeflex/primeflex.css";
import Shimmer from "./containers/shimmer/shimmer";
import UserDashboard from "./containers/user/UserDashboard";
import BillingPage from "./containers/user/BillingPage";
import PrimeManagement from "./containers/admin/PrimeManagement";
import BeginnerLevel from "./containers/admin/BeginnerLevel";
import AdvancedLevel from "./containers/admin/AdvancedLevel";
import FreeTrailPage from "./containers/admin/FreeTrail";
import OtpEmail from "./containers/user/OtpEmail";
import ProfileView from "./containers/user/ProfileView";

const App = () => {
  const { isAuthenticated, authLoading } = useSelector((state) => state.user);
  const { isAdminAuthenticated } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (authLoading) return <Shimmer />;
  return (
    <Router>
      <Routes>
        {/* user side routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpEmail />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/home" element={<HomeDashboard />} />
        <Route path="/blog-idea" element={<GenerationPage />} />
        <Route path="/blog-generate" element={<BlogGeneratorPage />} />
        <Route path="/story-generate" element={<StoryGeneratorPage />} />
        <Route path="/content-view" element={<ContentView />} />
        <Route path="/home/dashboard" element={<UserDashboard />} />
        <Route path="/home/dashboard/billing-page" element={<BillingPage />} />
        <Route path="/home/dashboard/profile-view" element={<ProfileView />} />

        {/* admin side routes */}

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-page" element={<Dashboard />} />
        <Route path="/users-list" element={<Users />} />
        <Route path="/admin-page/prime-management" element={<PrimeManagement />} />
        <Route path="/admin-page/prime-management/free-trail-management" element={<FreeTrailPage />} />
        <Route path="/admin-page/prime-management/beginner-level-management" element={<BeginnerLevel />} />
        <Route path="/admin-page/prime-management/advanced-level-management" element={<AdvancedLevel />} />

      </Routes>
    </Router>
  );
};

export default App;
