import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './containers/user/LandingPage';
import LoginPage from './containers/user/LoginPage';
import RegisterPage from './containers/user/RegisterPage';
import './style.css'
import { Provider } from 'react-redux';
import {store} from './store';
import GeneratePage from './containers/user/UserDashboard';
import AdminLogin from './containers/admin/AdminLogin';
import AdminPage from './containers/admin/AdminPage';
import Users from './containers/admin/User';
import Dashboard from './containers/admin/Dashboard';
import UserDashboard from './containers/user/UserDashboard';
import GenerationPage from './containers/user/GenerationPage';
import { BlogGenerator } from './features/user';
import BlogGeneratorPage from './containers/user/BlogGenerate';
import StoryGenerator from './containers/user/StoryGenerator';
import ContentView from './containers/user/ContentView';
import StoryGeneratorPage from './containers/user/StoryGenerator';
const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/home" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-page" element = {<Dashboard/>} />
        <Route path="/users-list" element={<Users/>} />
        <Route path="/blog-idea" element={<GenerationPage/>} />
        <Route path="/blog-generate" element={<BlogGeneratorPage/>} />
        <Route path="/story-generate" element={<StoryGeneratorPage/>} />
        <Route path="/content-view" element={<ContentView/>} />
      </Routes>
    </Router>

  )
}

export default App