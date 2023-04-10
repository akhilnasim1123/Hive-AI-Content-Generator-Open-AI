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
const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/generate-page" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-page" element = {<Dashboard/>} />
        <Route path="/users-list" element={<Users/>} />
      </Routes>
    </Router>

  )
}

export default App