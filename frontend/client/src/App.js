import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './containers/user/LandingPage';
import LoginPage from './containers/user/LoginPage';
import RegisterPage from './containers/user/RegisterPage';
import './style.css'
import { Provider } from 'react-redux';
import {store} from './store';
import GeneratePage from './containers/user/GeneratePage';
import AdminLogin from './containers/admin/AdminLogin';
import AdminPage from './containers/admin/AdminPage';
const App = () => {
  return (

<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/generate-page" element={<GeneratePage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-page" element = {<AdminPage/>} />
      </Routes>
    </Router>

  )
}

export default App