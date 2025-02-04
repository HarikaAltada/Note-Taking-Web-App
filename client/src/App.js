import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Favorite from "./components/Favorite";
import Layout from "./components/Layout";
const App = () => {
  return (
    <Router>
      <div>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorite" element={<Favorite/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
